import { Mongo } from 'meteor/mongo';
import './main.html';

const Todos = new Mongo.Collection('todos');
Meteor.subscribe('todosNotDone');