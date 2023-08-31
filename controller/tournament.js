const defaultFunction = require('../core/responser');
const logger = require('../core/logger');
const tournamentService = require('../services/tournament');

const action = {};

action.addTournament = async (data) => {
  logger.info('Adding new Tournaments', data);
  try {
    const tournamentData = await tournamentService.addTournament(data);
    return defaultFunction.success({
      response: tournamentData,
      message: 'Tournaments added successfully!',
      total: 1,
    });
  } catch (error) {
    logger.error('Failed while adding tournament', error);
    return defaultFunction.somethingWentWrong({ error: error, message: 'Failed while adding tournament' });
  }
};

action.updateTournament = async (data) => {
  logger.info('Updating tournaments', data);
  try {
    let query = {
      _id: data._id,
    };
    const tournamentData = await tournamentService.updateTournament(query, data);
    return defaultFunction.success({
      response: null,
      message: 'Tournament updated successfully!',
      total: 1,
    });
  } catch (error) {
    logger.error('Failed while updating tournament', error);
    return defaultFunction.somethingWentWrong({ error: error, message: 'Failed while updating tournament' });
  }
};

action.getTournamentDetails = async (query) => {
  try {
    if (!query || !query._id) {
      throw 'tournamentId cannot be null';
    }
    let userQuery = {
      _id: query._id,
    };
    const tournamentDetail = await tournamentService.getTournamentDetails(userQuery);
    return defaultFunction.success({
      response: tournamentDetail,
      message: tournamentDetail ? 'Tournament detail fetched successfully' : 'Tournament Detail not found',
    });
  } catch (error) {
    logger.error('Failed to get tournament details', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.allTournaments = async (query) => {
  try {
    let queryData = {
      // Additional query parameters if needed
    };

    const tournaments = await tournamentService.listTournaments(queryData);

    return defaultFunction.success({
      response: tournaments,
      message: 'Tournaments listed successfully',
      total: tournaments.length,
    });
  } catch (error) {
    logger.error('Failed while listing tournaments', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.myTournaments = async (query) => {
  try {
    if (!query || !query.userId) {
      throw 'userId cannot be null';
    }
    
    let queryData = {
      user: query.userId,
    };

    const myTournaments = await tournamentService.myTournaments(queryData);

    return defaultFunction.success({
      response: myTournaments,
      message: 'My Tournaments listed successfully',
      total: myTournaments.length,
    });
  } catch (error) {
    logger.error('Failed while listing My Tournaments', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.joinRequests = async (query) => {
  try {
    let queryData = {
      tournament: query.id,
    };

    console.log("queryData", queryData);

    const myTournaments = await tournamentService.joinRequests(queryData);

    return defaultFunction.success({
      response: myTournaments,
      message: 'My Tournaments listed successfully',
      total: myTournaments.length,
    });
  } catch (error) {
    logger.error('Failed while listing My Tournaments', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.updateRequestStatus = async (query) => {
  try {
    let queryData = {
      _id: query._id,
    };

    console.log("query data", queryData, query);

    const tournament = await tournamentService.updateRequestStatus(queryData, query);

    return defaultFunction.success({
      response: tournament,
      message: 'Tournament status updated successfully',
    });
  } catch (error) {
    logger.error('Failed to update status', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.joinTournament = async (query) => {
  try {
    const joinedTournament = await tournamentService.joinTournament(query);

    return defaultFunction.success({
      response: joinedTournament,
      message: 'Joined the tournament successfully',
    });
  } catch (error) {
    logger.error('Failed to join tournament', error);
    return defaultFunction.somethingWentWrong({ error });
  }
};

action.addLeaderboard = async (data) => {
  logger.info('Adding user to leaderboard', data);
  try {
    const addLeaderboard = await tournamentService.addLeaderboard(data);
    return defaultFunction.success({
      response: addLeaderboard,
      message: 'User added to leaderboard!',
    });
  } catch (error) {
    logger.error('Failed while adding tournament', error);
    return defaultFunction.somethingWentWrong({ error: error, message: 'Failed while adding tournament' });
  }
};

action.getLeaderboards = async (query) => {
  try {
    const leaderboards = await tournamentService.getLeaderboards(query?.tournamentId);
    return defaultFunction.success({
      response: leaderboards,
      message: 'Leaderboards fetched successfully!',
      total: leaderboards.length,
    });
  } catch (error) {
    logger.error('Failed while fetching leaderboards', error);
    return defaultFunction.somethingWentWrong({ error, message: 'Failed while fetching leaderboards' });
  }
};

action.getLeaderboardHistory = async (query) => {
  try {
    const leaderboards = await tournamentService.getLeaderboardHistory(query?.tournamentId);
    return defaultFunction.success({
      response: leaderboards,
      message: 'Leaderboards fetched successfully!',
      total: leaderboards.length,
    });
  } catch (error) {
    logger.error('Failed while fetching leaderboards', error);
    return defaultFunction.somethingWentWrong({ error, message: 'Failed while fetching leaderboards' });
  }
};

action.getParticipantList = async (query) => {
  try {
    const leaderboards = await tournamentService.getParticipantList(query?.tournamentId);
    return defaultFunction.success({
      response: leaderboards,
      message: 'Participant list fetched successfully!',
      total: leaderboards.length,
    });
  } catch (error) {
    logger.error('Failed while fetching participants', error);
    return defaultFunction.somethingWentWrong({ error, message: 'Failed while fetching participants' });
  }
};


module.exports = action;
