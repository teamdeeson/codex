The version control system we use is [git](https://git-scm.com/). The purpose of version control is to ensure the
code created is saved in a central repository and that changes made to the codebase are reversable and there is an
audit trail.

## BitBucket

Deeson use **BitBucket** for version control as it ties neatly into our project management tool Jira.

Our BitBucket repository is located at [https://bitbucket.org/deesongroup6346](https://bitbucket.org/deesongroup6346)

You should sign up for a BitBucket account using your deeson email and request to be added to the account by one of the
administrators.  Any Pod SA should be able to do this.

### Sites that are hosted by Acquia and Pantheon

If your site is hosted by a platform provider, such as Acquia or Pantheon,
that comes with it's own git repository then you can configure
git to use both BitBucket and the platform repo without needing to change your
working practices too much.

When checking out the code, make sure that you run these commands:

    git remote set-url --add --push origin [bitbucket url]
    git remote set-url --add --push origin [platform provider url]

This will ensure that pushes to the remote "origin" always go to both
repositories.

## Commit messages

Make sure you commit messages include the Jira Ticket number in them as this ties the commit to the relevant Jira issue
and allows all activity on the ticket to be tracked and reviewed.

In writing a commit message keep in mind that you are writing it to inform other people involved in the project (as well as your future self) of what that commit achieves. If you can do that and entertain or vent at the same time that is great but the priority are messages that are concise and consistent.

Here are some simple guidelines to follow:

1. Limit the subject line to about 70 characters. Most online tools will cut off after that so best to get all the information in a way that is easy for others to read. Also makes it easier when using `git shortlog`.
2. Include the ticket number from Jira (or other bug tracking tool) in the subject line - e.g. "DEESON-23: Introduce NP-complete algorithm for natural language understanding".
3. Use the imperative mood in the subject line. This means that the commit message should read as a command that changes the application. For example say "DEESON-24: Add semantic annotation to all pages." vs "DEESON-24: Changed markup to include semantic annotation." If in doubt try to use your commit message in the phrase "If applied this commit will: <your commit message>". If that phrase works you are good to go!
4. Include further context in the message body as required. Try to explain the what and why. Don't worry about the how - the code should cover that.


## GitFlow

[Gitflow](http://nvie.com/posts/a-successful-git-branching-model/) is a branching model for Git. Its purpose is to
manage the development and release of features. All our projects use GitFlow.

GitFlow makes parallel development very easy, by isolating new development from finished work. New development
(such as features and non-emergency bug fixes) is done in feature branches, and is only merged back into main body of
code when the developer(s) is happy that the code is ready for release.

Ensure you have the GitFlow tools installed locally, you can install it via Homebrew with:

    brew install git-flow

You should also install the command line auto completion tool to all tab completion of git and git flow commands:

1. Install bash-completion with Homebrew

        brew install bash-completion

2. Add bash-completion to your `.bash_profile`:

        if [ -f `brew --prefix`/etc/bash_completion ]; then
            . `brew --prefix`/etc/bash_completion
        fi

Here is an overview of the branching model, more information can be found at the link above.

![GitFlow](http://nvie.com/img/git-model@2x.png "GitFlow")

### The first rule of GitFlow

![First rule of GitFlow](http://deeson.co.uk/sites/default/files/secondary_images/images_and_text/gitflow-no-commit-to-master.jpg "First rule of GitFlow")

Don't commit code directly into master, use the git flow command line options described below.

### Feature branches

When you start a new issue it is generally a good idea to start a new feature for it. This can be done with the command
`git flow feature start [name]` where [name] is a descriptive name of the feature, the Jira issue id is a good name.

When you are finished with the feature it can be merged back into the develop branch with `git flow feature finish`

### Release branches

If you need to create a new release, this can be created via `git flow release start [release-name]` where
[release-name] is the name of the new tag which will be created.  We use the [SemVer](http://semver.org/) standard
for release names and so this should be an increment of the MINOR revision number.

### Hotfix branches

The master branch contains the codebase as it currently is in production. If you need to install a fix to production
and not release what is presently in develop you need to create a HotFix branch which is a branch from master:

    git flow hotfix start [release-name]

[release-name] is the name of the next tag release. We use the [SemVer](http://semver.org/) standard for release names
 and so this should be an increment of the PATCH revision number. After fixing the issue you would merge it into
 master and develop at the same time with this command

     git flow hotfix finish [release-name]

## Pull Requests

Pull requests are a great way to get structured peer-review feedback on your work.
It's important that you drive the process, by creating the PR yourself, asking
others in the team to review, and completing the merge to `develop` at the end.

When you complete development on a feature you should consider asking others in
the project team or pod to review your code. To create a pull request:

1. Head to BitBucket and locate your repository.
2. Go to the Pull Requests page and click "create pull request"
3. Locate your feature branch on the left and on the right select the `develop`
branch (as that's where your code will be going once it's approved).
4. Provide a reasonable title and description and review the diff preview below
then submit. Feel free to mark people as reviewers
5. Send a notification in Slack asking for feedback.

It's important that everyone in the team provides feedback on pull requests,
once you're happy with whatever it is you're reviewing you can click the "Approve"
button.

We don't recommend using BitBucket's merge facilty, it's usually better to use
the `git-flow` command line tool.

Remember that your work is always your own and you're still responsible for
testing work yourself.

## Semantic Versioning

We've taken inspiration from the [SemVer](http://semver.org/) standard for how
we manager release and tag names.

Given a version number MAJOR.MINOR.PATCH, we find that the MINOR portion aligns
well with git-flow releases and that the PATH portion works well for the hotfix]
which means we don't tend to update the MAJOR number throughout the project.

In practice this means that our version numbers follow the format:

    1.RELEASE.HOTFIX

With releases coming when adding functionality via the feature branching flow,
and hotfixes being used whenever a change is being applied directly to the live
environment (e.g security updates and bug fixes)
