# epitech-epic-roadtrip

epitech-epic-roadtrip is a web application for people who want to enjoy their vacations.
Whether you are looking for a restaurant or an activity for your trip, everything is on "???"!

## 👥 Members

-   _TAQUET Erwan_
-   _SALEON-TERRAS Joseph_
-   _LAVERNHE Hugo_

## 🧱 Project Organisation

### Branches

-   main: Protected branch, not allowed to push, merge deploys to production
-   development: Protected branch, push if critical hot-fix, default branch, starting point for new branches
-   production: Protected branch, not allowed to push, merge deploys to production
-   new branches: `${verb or action or name like 'feature' || 'fix' }/${concerned resource/file/fix like 'users'}` -> full example: feature/user_crud, rework/register_workflow, ...

### Code

Your code (at least your changes) should be lint.

### Commits

We are following the [gitmoji convention](https://gitmoji.dev/) (extension available on VSCode, Webstorm, ...):

-   ${gitmoji} ${title}
    -   ${change}
    -   ${change}
    -   ...

full example:

     :fire: Remove code or files
      - remove unused const
      - remove unsued import

     :bug: Fix a bug
      - fix wrong stuff

Your number of commits should match or be over the number of changes (number of file changed).

### Merge request and review

If you followed all the requirements above, the easier to read and review your merge requests (MR) will be therefore the faster they will be werged.

Once you consider your branch ready to be merged, create a new MR and assign your lead for a review.

If your MR does not meet the requirements above, they will not be merged and comments will be added for you to fix the line/file concerned. The easiest way to fix the issue is to checkout the concerned branch, commit your fix and push.

## Coding style

For API project:

-   4 spaces for indentation
-   LF end of line
-   Run `npm run lint` to conform to our lint rules

## 🗃️ Resources

## Deployment

1. Checkout to deploy branch
2. Apply your changes to the branch
3. Build the front app :

```bash
$ yarn build:front:win
```

4. Connect to Heroku
5. Create a new branch with only /api ready for deployment :

```bash
$ git subtree split --prefix api -b <deploy_branch_name>
```

6. Publish the deployment branch ready to Heroku

```bash
$ git push heroku <deploy_branch_name>:master
```

## Trello

https://trello.com/b/oaSjcFtH/roadtrip
