import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { searchArticles, postArticle } from './../../../../api/research';
import styles from './../expertStyles/research.module.scss';

function Research() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', tags: '' });

  const fetchArticles = async (query) => {
    try {
      const res = await searchArticles(query);
      setArticles(res.data || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchArticles(searchQuery);
      } else {
        setArticles([]); // Clear results if input is empty
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = newArticle.tags.split(',').map(tag => tag.trim());
    const res = await postArticle({ ...newArticle, tags: tagsArray });

    if (res.success) {
      alert('Article posted!');
      setNewArticle({ title: '', content: '', tags: '' });
      fetchArticles(''); // Refresh list
    } else {
      alert('Failed to post article.');
    }
  };

  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.researchContainer}>
        <Typography variant="h4" className={styles.header}>Research Articles</Typography>

        <TextField
          label="Search Articles..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBar}
        />

        <div className={styles.articleList}>
          {articles.map((article, index) => (
            <Paper key={index} elevation={3} className={styles.articleCard}>
              <Typography variant="h6" className={styles.articleTitle}>
                {article.title}
              </Typography>
              <Typography variant="body2" className={styles.articleContent}>
                {article.content}
              </Typography>
              <Typography variant="caption" className={styles.articleMeta}>
                By {article.createdBy?.name || 'Unknown'} | Tags: {article.tags.join(', ')}
              </Typography>
            </Paper>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.writeForm}>
          <Typography variant="h5">Write New Article</Typography>

          <TextField
            label="Title"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Content"
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            fullWidth
            multiline
            rows={4}
            required
            margin="normal"
          />
          <TextField
            label="Tags (comma separated)"
            value={newArticle.tags}
            onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value })}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary" type="submit" className={styles.submitBtn}>
            Post Article
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Research;
