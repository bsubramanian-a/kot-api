const defaultFunction = require('../core/responser');
const { addTournament, updateTournament, getTournamentDetails, allTournaments, myTournaments, joinRequests, updateRequestStatus, joinTournament, addLeaderboard, getLeaderboards, getLeaderboardHistory, getParticipantList } = require('../controller/tournament'); // Import species controller functions
const logger = require('../core/logger');
const coreDB = require('../core/db');

module.exports.init = async (req,res) => {
  const db = await coreDB.openDBConnection();
  logger.data("queryStringParameters",req.query);
  console.log("req.url",req.url)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  console.log("pathname",pathname);
  logger.data("db done");
  try {
    console.log('tournament handler');
    switch (true) {
      case pathname === '/add-tournament' && req.method === 'POST':
        return await addTournament(req.body);
      case pathname === '/update-tournament' && req.method === 'PUT':
        return await updateTournament(req.body);
      case pathname === '/get-tournament-details' && req.method === 'GET':
        return await getTournamentDetails(req.query);
      case pathname === '/all-tournaments' && req.method === 'GET':
        return await allTournaments(req.query);
      case pathname === '/my-tournaments' && req.method === 'GET':
        return await myTournaments(req.query);
      case pathname === '/join-requests' && req.method === 'GET':
        return await joinRequests(req.query);
      case pathname === '/update-request-status' && req.method === 'PUT':
        return await updateRequestStatus(req.body);
      case pathname === '/join-tournament' && req.method === 'POST':
        return await joinTournament(req.body);
      case pathname === '/add-leaderboard' && req.method === 'POST':
        return await addLeaderboard(req.body);
      case pathname === '/get-leaderboards' && req.method === 'GET':
        return await getLeaderboards(req.query);
      case pathname === '/get-leaderboard-history' && req.method === 'GET':
        return await getLeaderboardHistory(req.query);
      case pathname === '/get-pariticipant-list' && req.method === 'GET':
        return await getParticipantList(req.query);
      default:
        return defaultFunction.handlerNotFound();
    }
  } catch (error) {
    logger.data('Function failed', error);
    const responseDataObject = {
      error: error,
      req: req,
      handler: 'species',
      messageCode: 'S001',
    };
    return defaultFunction.failure(responseDataObject);
  } finally {
    await coreDB.closeDBConnection(db);
  }
};
