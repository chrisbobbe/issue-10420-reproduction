import { Meteor } from 'meteor/meteor';
import { Mongo, MongoInternals } from 'meteor/mongo';

const Todos = new Mongo.Collection('todos');

Meteor.publish('todosNotDone', () => {
    return Todos.find({ isDone: false });
});

const MongoClient = MongoInternals.defaultRemoteCollectionDriver().mongo.client;

Meteor.methods({
    async 'toggleTodo'() {
        const session = MongoClient.startSession();
        await session.startTransaction();
        try {
            const todo = await Todos.rawCollection().findOne({}, { session });
            console.log('setting', todo._id, 'to', !todo.isDone);
            await Todos.rawCollection().updateOne({ _id: todo._id }, { $set: { isDone: !todo.isDone } }, { session });
            await session.commitTransaction();
            console.log('Success!');
        } catch (error) {
            console.error(error);
            await session.abortTransaction();
        }
    }
});

Meteor.startup(() => {
    if (Todos.find({}).count() === 0) {
        Todos.insert({ description: 'My First Todo', isDone: false });
        Todos.insert({ description: 'My Second Todo', isDone: false });
    }
});
