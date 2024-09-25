const axios = require('axios');

async function getServerInfo(serverIP, serverPort, retries = 3, delay = 5000) {
  if (!serverIP || !serverPort) {
    throw new Error('Invalid server IP or port');
  }

  const url = `http://${serverIP}:${serverPort}/info.json`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429 && attempt < retries) {
        console.log(`Received 429 error. Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw new Error(`Error fetching server information: ${error.message}. URL: ${url}`);
      }
    }
  }
}

async function getServerPlayer(ip, port, retries = 3, delay = 5000){
  const url = `http://${ip}:${port}/players.json`;
  for(let attempt = 1; attempt <= retries; attempt++){
      try{
          const response = await axios.get(url);
          return response.data

      }catch(error){
          if (error.response && error.response.status === 429 && attempt < retries){
              console.log(`Received 429 error. Retrying in ${delay / 1000} seconds...`);
              await new Promise(resolve => setTimeout(resolve, delay));
          }else{
              throw new Error(`Error fetching server information: ${error.message}. URL: ${url}`);
          }
      }
  }
}

async function FivemQuery(ip, port){
  try{
    const serverInfo = await getServerInfo(ip, port);
    const players = await getServerPlayer(ip, port);
    return {server: serverInfo, players: players}

  }catch(e){
    console.log(e)
  }
}

module.exports = { FivemQuery }
