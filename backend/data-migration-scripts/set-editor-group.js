require('dotenv').config();
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
});

/**
 * There isn't any way to get to users
 * via the API yet. To get user ids go to
 * https://manage.sanity.io/projects/1f1lcoov/team
 * Open the web inspector and look at the XHR requests
 * There you'll find an API call with the users’ and names
 * in an array.
 *
 * See https://www.sanity.io/docs/data-store/third-party-login#managing-groups-and-users
 * for more information on custom permissions and filters
 *
 * These permissions are _incremental_, which means that if the user
 * is already in another group with broader permissions, narrower permissions
 * here will have no effect.
 *
 * To run this script you need to make an .env-file in the /backend-folder, and add EDITOR_GROUP=<comma separated ids of the editors>
 * Run the script with sanity exec data-migration-scripts/set-editor-group.js --with-user-token
 */

const groupsDoc = {
  _id: '_.groups.writers', // "writers" is an arbitarly set name for this group
  _type: 'system.group',
  grants: [
    {
      path: '*',
      permissions: ['read'],
    },
    {
      path: 'drafts.**',
      permissions: ['create', 'read', 'update'],
    },
  ],
  members: process.env.EDITOR_GROUP.split(',')
};

client.createOrReplace(groupsDoc).then(console.log).catch(console.error);
