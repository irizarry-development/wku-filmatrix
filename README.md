# WKU Filmatrix

This is our senior capstone project that we have been tasked to build for the WKU Film and Journalism Department.

# 0.0 GitHub Conventions

## 0.0.1 Branching

In this project, it will be of the utmost importance that we always have something meaningful to show our client. Even even our early stages of development, it is important that we aren't displaying non-functioning work to a client.

Therefore, I propose we adhere to a set of guidelines around how we commit to our local repository. There will be three main branches:

### Main

This is our client facing, production branch that the client can look at anytime by clicking [here](https://wku-filmatrix.vercel.app). Commiting to this branch should be done via a **PR** via the develop branch.

### Develop

This should not client facing; however, the client may want to see how things are going on a task. So even though this may contain experimental features that could inhibit functionalities of the app, it should be somewhat functional.

Commiting to this project should be done via a **PR** via the requested PR. This ensures we have time to test the new features before we implement them to the production branch.

### Feature

These should not be shown to a client, as they likely may not gain anything from visually seeing it. For example, `feature/auth` is not meanignful until the client can see the authentication flow.

To create a feature branch (in this example we will use `feature/auth`):

1.  ensure that you are checked in the develop branch.

    ```
    git checkout develop
    ```

2.  Pull the most recent develop changes.

    ```
    git pull origin develop.
    ```

3.  Resolve any conflicts
4.  Check out to the new feature branch.

        ```
        git checkout -B feature/auth --track origin/develop
        ```

    The above command tracks the develop branch, ensuring that your feature commit does not get too far behind any potential changes from someone else. Also, if you run the `git status` command, it will give you more information. For example:

**Without `--track` flag**

```
$ git status
On branch feature/auth
Your branch is ahead of 'origin/dev' by 1 commit.
  (use "git push" to publish your local commits)
```

**With `--track` flag**

```
$ git status
On branch feature/auth
Your branch and 'origin/develop' have diverged,
and have 3 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)
```

#### Naming Conventions

Try and be brief but descriptive with the branch names. For example

```
feature/auth
feature/vendor-api
feature/people-dashboard
```

**_I didn't enforce branch protection rules on GitHub, but as much as possible it would be really great to try and stick to them._**

# 0.1 Local Environment Setup

There are a few things you will want to make sure you have installed in your local environment.

## 0.1.1 PNPM

As this is a more modern project, we are going to be using a modern package manager with it as well. Note, this still installs from the same remote locations, just quicker and in a more space effective way.

To install, simply click [here](https://pnpm.io/installation) for install instructions depending on your individual operating system.

## 0.1.2 Setup `.env` with a local database

If you prefer to use a local PostgreSQL database instead of connecting to the one hosted by Vercel, you will need to set this up here. Once you have your PostgreSQL database setup, you will need to construct a `NEXTJS_DATABASE_URL`.

The format to do so is

```
postgres://[db_username]:[db_password]@[db_host_url]:[db_port]/[db_name]
```

If you never have used PostgreSQL on your machine before, you can just use the default database and this would be your URL

```
postgres://postgres:postgres@localhost:5432/postgres
```

However, if you have multiple databases and users on your machine, the URL may look like

```
postgres://matt:b78sd#.22@localhost:5432/wku-filmatrix
```

Once you have your NEXTJS_DATABASE_URL, navigate to the `.env.example` file in the very root of the directory, and replace **BOTH** environment variables with the above URL.

Once you have done so run `npx prisma db push` which will migrate the local database schema to whatever is currently specified by `schema.prisma`. Then, run `npx prisma db seed` which will seed the database with its seed data. At this point, you should have a working local database for the project.

### Potential Errors

If you run into an error, such as the credentials provided for `postgres` are not valid, you can do the following to fix it.

1. `sudo -u postgres psql`

   This launches psql under the postgres username

2. Make the prompt should look as below:

   ```
   postgres=# ALTER USER postgres PASSWORD 'postgres';
   ALTER ROLE
   postgres=#
   ```

   You can use a different password if you want.

Now you should be able to use the default URL provided above. If you wish to user a different user, or perhaps a different database all together, just make sure you replace the proper sections in the database URL, that way you can properly connect to the database.

For any issues troubleshooting your database not launching, or other issues, turn to Google. It truly is your best friend on issues working with Postgres. Someone has had your issue before.

## 0.1.3 Setup `.env` with a Vercel Postgres database

If you are going to be deploying to Vercel, or utilizing their Vercel Postgres Databases, you may benefit from installing the VercelCLI.

**To install VercelCLI with PNPM**

```
pnpm i -g vercel@latest
vercel --version
```

Link the project with `vercel link`, then simply type `vercel env pull .env` where it will populate any environment variables from your app.

## 0.1.4 Test Accounts

```
matt@wku.edu - wku496
zach@wku.edu - wku496
trevor@wku.edu - wku496
```
