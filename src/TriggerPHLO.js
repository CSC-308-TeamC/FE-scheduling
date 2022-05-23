// var plivo = require('plivo');
// var PhloClient = plivo.PhloClient;

// var authId = 'MAZTVHYZU0OGJKZJDIN2';
// var authToken = 'Zjc0MGY3ZjdmMWI0MmU5ZTkxZmIzZmM4MThhYTg2';
// var phloId = 'bcedeb73-a931-41a1-bbb8-b50532a3e4d3';
// var phloClient = phlo = null;

// var payload = {
//     From: '+16508105863',
//     To: '+14848811135',
// }
// phloClient = new PhloClient(authId, authToken);
// phloClient.phlo(phloId).run(payload).then(function (result) {
//     console.log('Phlo run result', result);
// }).catch(function (err) {
//     console.error('Phlo run failed', err);
// });

var plivo = require('plivo');
(function main() {
    'use strict';
    var client = new plivo.Client("MAZTVHYZU0OGJKZJDIN2", "Zjc0MGY3ZjdmMWI0MmU5ZTkxZmIzZmM4MThhYTg2");
    client.messages.create(
      { 
          src: "+16508105863", 
          dst: "+16508105863",
          text: "Appointment reminder: 12:00 noon tomorrow. Please reply to this message if you need to make a change"
      }
      ).then(function (response) {
        console.log(response);
    });
})();