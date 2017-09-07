# Yo

### commands
npm install
npm test
npm run dev

---

### routes
+ get http://0.0.0.0:8000/article
+ post http://0.0.0.0:8000/article
  - body: { title: string, content: string, author: string }
+ get http://0.0.0.0:8000/article/:id
+ put http://0.0.0.0:8000/article/:id
  - body: { votes_up: integer, votes_down: integer }
+ delete http://0.0.0.0:8000/article/:id
  - this is softdelete, mark delete_at to current timestamp
+ post http://0.0.0.0:8000/article/:id/comment
  - add comment to te article
