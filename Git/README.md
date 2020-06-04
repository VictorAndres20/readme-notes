# Create new Repo and add Remote
```
$ sudo git init
$ sudo git config user.email "vapedraza@example.co"
$ sudo git config user.name "victorandres20"
$ sudo git remote add origin http://github/repository
```

-------------------------------------------------------------------------------------------------


# chown .git to your user for dont use sudo
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
$ sudo git clone http://url/project.git
$ sudo git fetch
$ sudo git branch --all
$ sudo git checkout develop
```


-------------------------------------------------------------------------------------------------

# Pull specific branch
pull [REMOTE] [BRANCH]
```
$ sudo git pull origin master
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