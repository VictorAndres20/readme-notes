# Use SSH key for secure authentication

Create ssh key running

```bash
ssh-keygen
```

This prompts config like:
- Specify the key file name, e.g.: ~/.ssh/id_gh
- Specify and confirm your passphrase

Two files should be created after this:
~/.ssh/id_gh # Private key
~/.ssh/id_gh.pub # Public key

Now, you should create a SSH key in github. Settings > SSH and GPG keys , hit "New SSH key".
Paste Public key content, `.pub` file content.

Lets config git to use ssh key.

Create or update ssh config file

```bash
vi ~/.ssh/config
```

Use this configuration:

```
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_gh
  IdentitiesOnly yes
```

Now you can use git operations and clone repositories using ssh and not https!

## More than one account?

If you have two accounts, you can generate two SSH keys, configure them in the accounts, and then configure your ssh config like:

```bash
vi ~/.ssh/config
```

Use this configuration:

```
Host personal-github.com
  AddKeysToAgent yes
  UseKeychain yes
  HostName github.com
  User git
  IdentityFile ~/.ssh/personal_id_gh
  IdentitiesOnly yes

Host work-github.com
  AddKeysToAgent yes
  UseKeychain yes
  HostName github.com
  User git
  IdentityFile ~/.ssh/work_id_gh
  IdentitiesOnly yes
```

Now, Note that 'Host' name has an alias, so you should switch remote host from `github.com` to `host as confgiured`, like:

personal: `git@personal-github.com:your-username/repo.git`
work: `git@pwork-github.com:your-org/repo.git`

-------------------------------------------------------------------------------------------------


# Delete file from the repo and add it to the .gitignore

```
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
echo .DS_Store >> .gitignore
git add .gitignore
git commit -m '.DS_Store banished!'
```

-------------------------------------------------------------------------------------------------

# Delete multiple local branches with branch name starts with


```
git branch -d `git branch | grep -E 'vic/name-branch'`
```

```
git branch -D `git branch | grep -E 'vic/name-branch'`
```

-------------------------------------------------------------------------------------------------

# Create new Repo and add Remote
```
$ sudo git init
$ sudo git config user.email "vapedraza@example.co"
$ sudo git config user.name "victorandres20"
$ sudo git remote add origin http://github/repository
```

-------------------------------------------------------------------------------------------------


# chown .git to your user for don't use sudo
```
$ sudo chown -R user:user /path/to/your/project/.git
```


-------------------------------------------------------------------------------------------------


# Add files, commit and push
git push -u [REMOTE REPO] [BRANCH]
```
$ sudo git add .
$ sudo git commit -m "Mensaje"
$ sudo git push -u origin master
```

-------------------------------------------------------------------------------------------------

# Clone Repo 
```
$ sudo git clone http://<url.com>/<repo>.git
$ sudo git fetch
$ sudo git branch --all
$ sudo git checkout develop
```

# Clone private Repo using access token 
```
$ sudo git clone https://<username>:<token>@<url.com>/<repo>.git
$ sudo git fetch
$ sudo git branch --all
$ sudo git checkout develop
```

you can get "https://<username>:<token>@<url.com>"
with
```
$ cat ~/.git-credentials


-------------------------------------------------------------------------------------------------

# Pull from specific branch
pull [REMOTE] [BRANCH]
```
$ sudo git branch -f remote_branch_name origin/remote_branch_name
$ sudo git checkout remote_branch_name
```

-------------------------------------------------------------------------------------------------

# Pull specific branch and create it in other local branch
branch -f [BEANCH] [REMOTE] [BRANCH]
```
$ sudo git pull origin master
```


-------------------------------------------------------------------------------------------------

# Merge specific commit
merge [COMMIT ID]
```
$ sudo git fetch
$ sudo git checkout [branch]
$ sudo git merge 440f087
```


-------------------------------------------------------------------------------------------------

# Restore specific commit
reset --hard [COMMIT ID]
```
[OPTIONAL RECOMMENDED] $ sudo git checkout -b [NEW-BRANCH-TO-STORE-RESET]
$ sudo git reset --hard 360421f
[OPTIONAL delete untracked new files] $ sudo git clean -fd
```


-------------------------------------------------------------------------------------------------


# Change message commit
```
$ sudo git commit --amend
```


-------------------------------------------------------------------------------------------------


# Create new Branch
```
$ sudo git branch [NAME BRANCH]
```

-------------------------------------------------------------------------------------------------


# Switch Branch
```
$ sudo git checkout [BRANCH]
```

-------------------------------------------------------------------------------------------------


# Create new Branch and switch
```
$ sudo git checkout -b [NAME BRANCH]
```

-------------------------------------------------------------------------------------------------


# Command list Branches

**List local branches**
```
$ sudo git branch
```

**List local branches verbose**
```
$ sudo git branch -v 
```

**List remote and local branches**
```
$ sudo git branch -a
```
**OR** 
```
$ sudo git branch --all
```

**List remote and local branches (verbose)** 
```
$ sudo git branch -av
```

**List remote branches**
```
$ sudo git branch -r
```

**List remote branches with latest commit**
```
$ sudo git branch -rv
```

**List merged branches**
```
$ sudo git branch --merged
```

**List unmerged branches**
```
$ sudo git branch --no-merged
```

**List branches containing commit**
```
$ sudo git branch --contains [commit]
```


-------------------------------------------------------------------------------------------------


# URL repo remote
```
$ sudo git remote -v
```

# Change url remote repo
```
$ git remote set-url origin http://yourepo.git
```

-------------------------------------------------------------------------------------------------


# Merge branches
```
$ sudo git checkout develop
$ sudo git pull origin develop
$ sudo git merge feature/f1
$ sudo git push origin develop
```

-------------------------------------------------------------------------------------------------

# Renaming local and remote

```
# Rename the local branch to the new name
git branch -m $old_name $new_name

# Delete the old branch on remote
git push $remote --delete $old_name

# Or shorter way to delete remote branch [:]
git push $remote :$old_name

# Prevent git from using the old name when pushing in the next step.
# Otherwise, git will use the old upstream name instead of $new_name.
git branch --unset-upstream $new_name

# Push the new branch to remote
git push $remote $new_name

# Reset the upstream branch for the new_name local branch
git push $remote -u $new_name
```

-------------------------------------------------------------------------------------------------

# Delete remote branch
```
$ sudo git push origin --delete <branchName>
```


-------------------------------------------------------------------------------------------------

# Delete local branch
```
$ sudo git branch -d <branchName>
```


-------------------------------------------------------------------------------------------------

# Clean working tree, and pull with out local changes
```
$ sudo git reset --hard
$ sudo git pull
```



-------------------------------------------------------------------------------------------------

# Clean untracked (sin seguimiento) files
```
$ sudo git clean
$ sudo git clean -f		--> eliminar archivos sin seguimiento
$ sudo git clean -df		--> eliminar archivos y directorios sin seguimiento
$ sudo git clean -xdf		--> eliminar archivos o directorios sin seguimiento o ignorados
```


-------------------------------------------------------------------------------------------------

# Save credentials in git-credentials store (When you create a personal access token in GitHub and use it as passwd)

**First time creating a token**
Create personal access token, in GitHub, got to your Avatar/Setting/Developer Settings
Then execute in a project
```
git config credential.helper store
git fetch
```
Give user and 'personal access token' as passwd

This will save your personal access token as passwd
This credentials are store in your local machine in '/home/<user>/.git-credentials' file
The content is something like this
```
https://GIT_USER:TOKEN@github.com
```
And in project/.git/config file, this lines will be added
```
[credential]
        helper = store
```

**Config a project to use your personal access token created**
In project/.git/config file, add at the bottom this lines
```
[credential]
        helper = store
```

-------------------------------------------------------------------------------------------------

# GIT FLOW
	https://nvie.com/posts/a-successful-git-branching-model/

## feature branches, develop new features for the upcoming or a distant future release. Branch them from develop. Merge back into develop
```
$ sudo git checkout -b feature-some develop
$ sudo git push -u origin feature-some
$ sudo git add .
$ sudo git commit -m "New Module ready"
$ sudo git push -u origin feature-some
$ sudo git checkout develop

**--no-ff merge to always create a new commit object**

$ sudo git merge --no-ff feature-some

**Delete brancj if you want**

$ sudo git branch -d feature-some
$ sudo git push origin develop
```

## release branches, a new production release. Branch them from develop. Merge into develop and master

```
$ sudo git checkout -b release-1.2 develop

**fictional shell script that changes some files in the working copy to reflect the new version.**

$ ./bump-version.sh 1.2
$ sudo git commit -a -m "Bumped version number to 1.2"
$ mybe push
$ sudo git checkout master
$ sudo git merge --no-ff release-1.2
$ sudo git tag -a 1.2
$ sudo git push -u origin master
$ sudo git checkout develop
$ sudo git merge --no-ff release-1.2
$ sudo git push -u origin develop
$ sudo git branch -d release-1.2
```

## hotfix branches, changes that need to act immediately. Branch them from master. Merge into develop and master
```
$ sudo git checkout -b hotfix-1.2.1 master
$ ./bump-version.sh 1.2.1
$ sudo git commit -a -m "Bumped version number to 1.2.1"
$ sudo git add .
$ sudo git commit -m "Fixed severe production bugs"
$ sudo git checkout master
$ sudo git merge --no-ff hotfix-1.2.1
$ sudo git tag -a 1.2.1
$ sudo git push -u origin master
$ sudo git checkout develop
$ sudo git merge --no-ff hotfix-1.2.1
$ sudo git push -u origin develop
$ sudo git branch -d hotfix-1.2.1
```

## Visualize Git Flow
```
$ sudo git log --all --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```


-------------------------------------------------------------------------------------------------