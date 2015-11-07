function friendUpdate(response){
  let source = $('.identifier').val();
  $('#locations').append(formatLocation(response, source));
}

function formatLocation(coordinates, source){
  return `<li>Location for ${source} - Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}</li>`
}

export default class Location {
  constructor(socket, sessionId){
    this.channel = socket.channel(`locations:${sessionId}`, {})
    this.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
    this.channel.on("friend_update", friendUpdate)
  }
  updateFriends(){
    navigator.geolocation.watchPosition(coordinates => {
      let {coords: {latitude: latitude, longitude:longitude}} = coordinates;
      this.channel.push("updated_friend_location", {longitude, latitude});
    });
  }

}
