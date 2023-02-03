## Repo origin story

```shellsession
$ pnpm dlx create-next-app@latest docs --use-pnpm --src-dir --typescript --eslint --experimental-app false --import-alias '@/*'
../Library/pnpm/store/v3/tmp/dlx-34379   |   +1 +
../Library/pnpm/store/v3/tmp/dlx-34379   | Progress: resolved 1, reused 1, downloaded 0, added 1, done
Creating a new Next.js app in /Users/solen/repos/docs.

Using pnpm.

Installing dependencies:
- react
- react-dom
- next
- @next/font
- typescript
- @types/react
- @types/node
- @types/react-dom
- eslint
- eslint-config-next

Packages: +267
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /Users/solen/Library/pnpm/store/v3
  Virtual store is at:             node_modules/.pnpm
Progress: resolved 279, reused 259, downloaded 8, added 267, done

dependencies:
+ @next/font 13.1.6
+ @types/node 18.11.18
+ @types/react 18.0.27
+ @types/react-dom 18.0.10
+ eslint 8.33.0
+ eslint-config-next 13.1.6
+ next 13.1.6
+ react 18.2.0
+ react-dom 18.2.0
+ typescript 4.9.5

Done in 7.9s

Initializing project with template: app

Initialized a git repository.

Success! Created docs at /Users/solen/repos/docs
```

Now we have a starter next.js repo created with a first commit.

So we get docs going to keep track of some history.

```shellsession
$ cd docs
$ mkdir -p docs/historical
$ touch docs/historical/bootstrapping-repo.md
# write this doc you are reading
$ git add docs/historical/bootstrapping-repo.md
$ git commit -m 'write bootstrapping-repo doc'
```
