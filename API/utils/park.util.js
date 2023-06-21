const hasQueryString = function(req) {
    return new Promise((resolve, reject) => {
        if(req.query) resolve(true)
        else resolve(false)
    });
}

const hasParams = function(hasQueryResult ,query){
 return new Promise((resolve, reject) => {
    const  params = {offset:null,count:null};

   if (hasQueryResult && process.env.OFFSET in query) {
     params.offset = query.offset;

   }
   if (hasQueryResult && process.env.COUNT in query) {
     params.count = query.count;

   }
     if( hasQueryResult ) resolve(params)
     else resolve()
 });
}
const isNotNumber = function(params) {
 return new Promise((resolve, reject) => {
   if ((params.offset && isNaN(params.offset)) || (params.count && isNaN(params.count))) {
     reject({
       message: process.env.OFFSET_SHOULD_BE_NUMBER,
       status: process.env.CLIENT_ERROR
     });
   } else {
     resolve(params);
   }
 });
};


const updateOffsetAndCount = function(params, defaultParams) {
 return new Promise((resolve, reject) => {
      if(params.offset) defaultParams.offset = params.offset;
      if(params.count) defaultParams.count = params.count;
      resolve()
 });
}

const isParkFound = function (park) {
    return new Promise((resolve, reject) => {
      if (park) {
        resolve(park);
      } else {
        reject(process.env.PARK_NOT_FOUND);
      }
    });
  }

module.exports = {
    updateOffsetAndCount,
    isNotNumber,
    hasParams,
    hasQueryString,
    isParkFound
}