//Database Connection.
module.exports = {
  // url:"mongodb://b4227cb8e4ce68b0042664f4b7270166:9494175772@11a.mongo.evennode.com:27018,11b.mongo.evennode.com:27018/b4227cb8e4ce68b0042664f4b7270166",
  // url: 'mongodb://127.0.0.1:27017/medhome',
  url: 'mongodb+srv://deepak:4emc9122@cluster0.fxlzp.mongodb.net/medhome?retryWrites=true&w=majority',
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
}
