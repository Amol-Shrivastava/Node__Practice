const {MongoClient} = require('mongodb');

const demoPerson = {
    name: "Harry",
    lastName: "Wills"
}

const findKey = {name: "Harry"};

MongoClient.connect('mongodb://127.0.0.1:27017/demo_person', (err, client) => {
    if(err) throw new Error(err);
    console.log('Connection Successful');

    const db = client.db('demo_people');
    const collection = db.collection('people');
    
    //code to insert
    collection.insertOne(demoPerson, (err, docs) => {
        console.log('Inserter Person: ', docs[0]);
        console.log('ID: ', demoPerson._id);

        //code to find
        collection.find(findKey).toArray((err, results) => {
            console.log('Found results: ', results);

            //code to remove
            // collection.deleteOne(findKey, (err, results) => {
            //     console.log('Person deleted');
            //     client.close();
            // })

            client.close();
        })
    })
})