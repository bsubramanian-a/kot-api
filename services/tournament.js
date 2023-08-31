const logger = require('../core/logger');
const tournamentModel = require('../models/tournament');
const userModel = require('../models/userDetail');
const tournamentUserModel = require('../models/userTournament');
const tournamentPointsModel = require('../models/tournamentPoints');
const leaderboardModel = require('../models/tournamentPoints');
let mongoose = require("mongoose");
const { startOfYear, getDayOfYear, getISOWeek, getMonth } = require('date-fns');

const action = {};

action.addTournament = async (data) => {
  try {
    const tournament = new tournamentModel(data);
    return await tournament.save();
  } catch (error) {
    logger.error('Error while adding tournament', error);
    throw error;
  }
};

action.updateTournament = async (query, updateData) => {
  try {
    return await tournamentModel.findOneAndUpdate(query, updateData);
  } catch (error) {
    logger.error('Error while updating tournament', error);
    throw error;
  }
};

action.getTournamentDetails = async (query) => {
  try {
    return await tournamentModel.findOne(query);
  } catch (error) {
    logger.error('Error while fetching tournament detail', error);
    throw error;
  }
};

action.listTournaments = async (query) => {
  try {
    return await tournamentModel.find(query);
  } catch (error) {
    logger.error('Error while fetching tournament list', error);
    throw error;
  }
};

action.myTournaments = async (query) => {
  try {
    return await tournamentUserModel.find({ query }).populate("tournament");
  } catch (error) {
    logger.error('Error while fetching tournament list', error);
    throw error;
  }
};

action.joinRequests = async (query) => {
  try {
    return await tournamentUserModel.find(query).populate('user tournament');
  } catch (error) {
    logger.error('Error while fetching tournament list', error);
    throw error;
  }
};

action.updateRequestStatus = async (query, data) => {
  try {
    return await tournamentUserModel.findOneAndUpdate(query, data);
  } catch (error) {
    logger.error('Failed to update status', error);
    throw error;
  }
};

action.joinTournament = async (data) => {
  console.log("join tournament data", data);
  try {
    const tournament = new tournamentUserModel(data);
    return await tournament.save();
  } catch (error) {
    logger.error('Error joining tournament', error);
    throw error;
  }
};

action.addLeaderboard = async (data) => {
  try {
    const tournament = new tournamentPointsModel(data);
    return await tournament.save();
  } catch (error) {
    logger.error('Error while adding user to leaderboard', error);
    throw error;
  }
};

const removedays = (array) => {
  return array.map((entry) => {
    const { day, week, month, _id, ...rest } = entry;
    return rest;
  });
};

const getUserDetails = async (userId) => {
  try {
    const user = await userModel.find({ _id: userId });

    return user;
  } catch (error) {
    throw error;
  }
};

action.getLeaderboards = async (tournamentId) => {
  try {
    const leaderboards = await leaderboardModel.aggregate([
      {
        $match: {
          tournament: mongoose.Types.ObjectId(tournamentId),
        },
      },
      {
        $group: {
          _id: {
            user: '$user',
            day: { $dayOfYear: '$createdAt' },
            week: { $isoWeek: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          totalPoints: { $sum: '$points' },
          totalFishCatch: { $sum: '$fishCatch' },
        },
      },
      {
        $project: {
          user: '$_id.user',
          day: '$_id.day',
          week: '$_id.week',
          month: '$_id.month',
          totalPoints: 1,
          totalFishCatch: 1,
        },
      },
    ]);

    const today = new Date();
    const currentDay = getDayOfYear(today);
    const currentWeek = getISOWeek(today);
    const currentMonth = getMonth(today) + 1;

    const groupByUser = (leaderboard) => {
      const userMap = new Map();
      leaderboard.forEach((entry) => {
        const userId = entry.user._id.toString();
        if (!userMap.has(userId)) {
          userMap.set(userId, {
            user: entry.user,
            totalPoints: 0,
            totalFishCatch: 0,
          });
        }
        userMap.get(userId).totalPoints += entry.totalPoints;
        userMap.get(userId).totalFishCatch += entry.totalFishCatch;
      });
      return Array.from(userMap.values());
    };

    const dailyLeaderboard = groupByUser(leaderboards.filter(entry => entry.day === currentDay));
    const weeklyLeaderboard = groupByUser(leaderboards.filter(entry => entry.week === currentWeek));
    const monthlyLeaderboard = groupByUser(leaderboards.filter(entry => entry.month === currentMonth));

    dailyLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    weeklyLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    monthlyLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

    const addRanking = (leaderboard) => {
      leaderboard.forEach((entry, index) => {
        entry.ranking = index + 1;
      });
    };

    addRanking(dailyLeaderboard);
    addRanking(weeklyLeaderboard);
    addRanking(monthlyLeaderboard);

    const dailyLeaderboardWithoutDates = removedays(dailyLeaderboard);
    const weeklyLeaderboardWithoutDates = removedays(weeklyLeaderboard);
    const monthlyLeaderboardWithoutDates = removedays(monthlyLeaderboard);

    const replaceUserDetails = async (leaderboard) => {
      return await Promise.all(leaderboard.map(async (entry) => {
        const userDetails = await getUserDetails(entry.user);
        return {
          ...entry,
          user: userDetails,
        };
      }));
    };

    const dailyLeaderboardWithUserDetails = await replaceUserDetails(dailyLeaderboardWithoutDates);
    const weeklyLeaderboardWithUserDetails = await replaceUserDetails(weeklyLeaderboardWithoutDates);
    const monthlyLeaderboardWithUserDetails = await replaceUserDetails(monthlyLeaderboardWithoutDates);

    return {
      daily: dailyLeaderboardWithUserDetails,
      weekly: weeklyLeaderboardWithUserDetails,
      monthly: monthlyLeaderboardWithUserDetails,
    };
  } catch (error) {
    throw error;
  }
};

action.getLeaderboardHistory = async (tournamentId) => {
  try {
    const leaderboards = await leaderboardModel.find({
      tournament: mongoose.Types.ObjectId(tournamentId),
    }).populate('user tournament'); 

    console.log("leaderboards", leaderboards);

    const groupByUserAndRank = (leaderboard) => {
      const userRankMap = new Map();
      leaderboard.forEach((entry, index) => {
        const userDetail = entry.user;
        const userId = userDetail._id.toString();
        if (!userRankMap.has(userId)) {
          userRankMap.set(userId, {
            user: userDetail, 
            totalPoints: 0,
            totalFishCatch: 0,
            ranking: index + 1,
            tournament: entry.tournament
          });
        }
        userRankMap.get(userId).totalPoints += entry.points;
        userRankMap.get(userId).totalFishCatch += entry.fishCatch;
      });
      return Array.from(userRankMap.values());
    };

    const leaderboardHistory = groupByUserAndRank(leaderboards);

    leaderboardHistory.sort((a, b) => b.totalPoints - a.totalPoints);

    return {
      leaderboardHistory,
    };
  } catch (error) {
    throw error;
  }
};

action.getParticipantList = async (tournamentId) => {
  try {
    const leaderboards = await leaderboardModel.find({
      tournament: mongoose.Types.ObjectId(tournamentId),
    }).populate('user tournament'); 

    const groupByUserAndRank = (leaderboard) => {
      const userRankMap = new Map();
      leaderboard.forEach((entry, index) => {
        const userDetail = entry.user;
        const userId = userDetail._id.toString();
        if (!userRankMap.has(userId)) {
          userRankMap.set(userId, {
            user: userDetail, 
            totalPoints: 0,
            totalFishCatch: 0,
            ranking: index + 1,
            tournament: entry.tournament
          });
        }
        userRankMap.get(userId).totalPoints += entry.points;
        userRankMap.get(userId).totalFishCatch += entry.fishCatch;
      });
      return Array.from(userRankMap.values());
    };

    const pariticipantList = groupByUserAndRank(leaderboards);

    pariticipantList.sort((a, b) => b.totalPoints - a.totalPoints);

    return {
      pariticipantList,
    };
  } catch (error) {
    throw error;
  }
};


module.exports = action;
