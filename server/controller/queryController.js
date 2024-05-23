const QueryResponse = require("../models/queryResponse");

const creatingQueryResponse = async(req, res) => {
    try{
        const {query, response} = req.body;
        const newQueryResponse = new QueryResponse({
            query,
            response
        })
        await newQueryResponse.save();
        res.status(201).json({
            message: "Query response created successfully",
            data: newQueryResponse
        });
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

const gettingQueryResponses = async (req, res) => {
    try {
      const userInput = req.body.query;
  
      if (!userInput) {
        return res.status(400).json({
          error: "Please provide a query"
        });
      }
  
      // Check if the userInput contains keywords related to date
      const dateKeywords = ["today", "date", "current date", "today's date"];
      const containsDateKeyword = dateKeywords.some(keyword => 
        new RegExp(keyword, 'i').test(userInput)
      );
  
      if (containsDateKeyword) {
        const today = new Date();
        return res.status(200).json({
          response: today.toDateString()
        });
      }
  
      // Find the document where any of the strings in the 'query' array match the user input (case-insensitive)
      const queryResponse = await QueryResponse.findOne({
        query: { $regex: new RegExp(userInput, 'i') }
      });
  
      if (queryResponse) {
        res.status(200).json({
          response: queryResponse.response
        });
      } else {
        res.status(200).json({
          response: "For my knowledge, I can't understand what you ask."
        });
      }
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  };
  

module.exports = {
    creatingQueryResponse,
    gettingQueryResponses
}