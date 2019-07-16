import clientStart from './db'

export class Metric {
  timestamp: string;
  value: number;

  constructor(timestamp : string, value : number){
    this.timestamp = timestamp;
    this.value = value;
  }
}

export class MetricsHandler {

  private db: any

  constructor(db) {

    this.db = db
  }

  public save(metric: Metric, callback: (err: Error | null, result?: any) => void) {
      const collection = this.db.collection('documents')
      // Insert some document
      collection.insertOne(metric, function(err: any, result: any) {
        if(err) return callback(err, result)
        console.log("Document inserted into the collection")
        callback(err, result)
      });
  }

  public remove( query: any, callback: (err: Error | null, result?: any) => void) {
    console.log('remove')
      const collection = this.db.collection('documents')
      // Delete some document
      collection.deleteOne( {'value': 22}, function(err: any, result: any) {
        if(err) return callback(err, result)
        console.log("Document deleted into the collection")
        callback(err, result)
      });
  }

  public getA(metric: Metric, callback: (err: Error | null, result?: any) => void) {
      const collection = this.db.collection('documents')
      // Delete some document
      collection.find( metric, function(err: any, result: any) {
        if(err) return callback(err, result)
        console.log("Document will get the collection")
        callback(err, result)
      });
  }

}
