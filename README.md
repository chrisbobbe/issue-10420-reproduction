Reproduction instructions:

Run

`git clone https://github.com/chrisbobbe/issue-10420-reproduction.git`

`cd issue-10420-reproduction`

Set up a replica set locally to enable oplog tailing: https://www.manuel-schoebel.com/blog/meteorjs-and-mongodb-replica-set-for-oplog-tailing

(You will need to edit the MONGO_URL and MONGO_OPLOG_URL environment variables in the start script in package.json)

run `npm install`

Start the app with `yarn start` or `npm run start`

Open dev tools in the browser, and run from the console `Meteor.call('toggleTodo')`. Run it several times, and observe the `Error in oplog callback TypeError: Cannot read property 'toString' of undefined
` message. For some reason it only seems to happen every other time you call `toggleTodo`; I'm not sure why yet.

