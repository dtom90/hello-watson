// import { AssistantV2 } from 'ibm-watson';
import express from 'express';

// const assistant = new AssistantV2({});

const router = express.Router();

router.post('/', function (req, res) {
  return res.json({'output': {'text': 'Oops! It doesn\'t look like I have been configured correctly...'}});
})

export default router;
