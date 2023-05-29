const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key API_CLARIFAI");



// this is the old way of detecting using clarifai, but now we have done it with grpc,
// which ever way still works the same 
// const clarifai = require('clarifai');
// console.log(clarifai)


// const MODEL_ID = 'face-detection';   
// const returnClarifaiRequestOptions = (imageUrl) => {
//   const PAT = 'API_CLARIFAI';

//   const USER_ID = 'pee_jay1';       
//   const APP_ID = 'test';

//   const IMAGE_URL = imageUrl;


//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                 }
//             }
//         }
//     ]
// });
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
// };
//   return requestOptions;
// };


const handleApiCall = (req, res) => {
	stub.PostModelOutputs(
	    {
	        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
	        model_id: 'face-detection',
	        inputs: [{data: {image: {url: req.body.input}}}]
	    },
	    metadata,
	    (err, response) => {
	        if (err) {
	            console.log("Error: " + err);
	            return;
	        }

	        if (response.status.code !== 10000) {
	            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
	            return;
	        }

	        // this is the default that came with the general model
	        // console.log("Predicted concepts, with confidence values:")
	        // for (const c of response.outputs[0].data.concepts) {
	        //     console.log(c.name + ": " + c.value);
	        // }
	        res.json(response)
	    }
	);


// this is the old way of doing the clarifai
	// fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(req.body.input))
 	//   .then(response => response.json())
 	//   .then(data => {
 	//   	res.json(data)
 	//   })
 	//   .catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	 .increment('entries', 1)
	 .returning('entries')
	 .then(entries => {
	 	res.json(entries[0].entries)
	 })
	 .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}