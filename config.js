credentials = {
  accessKeyId: "AKIAIQMBOCEIMHNFDO2A",
  secretAccessKey: "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",
  region: "us-west-2",
  bucket: "test",
  s3_url : "https://test.s3.us-west-2.amazonaws.com/"
};
const aws = {
  region: "us-west-2",
  accessKeyId: "AKIAJMN4Q7XCDLSMPMHQ",
  secretAccessKey: "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",
};
module.exports = {
  credentials: credentials,
  aws: aws,
  secret: "supersecret",
};

global.s3_url = "https://s3-us-west-2.amazonaws.com/project-launch/";
global.s3_bucket_name = "project-launch";
global.base_url = "http://parentlaunch.engagedatasystems.com";
