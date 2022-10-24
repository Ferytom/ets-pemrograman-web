import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import { deletePost, likePost } from '../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${
                post.likes.length > 1 ? 's' : ''
              }`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon fontSize='small' />
          &nbsp;{post.likes.length}{' '}
          {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }

    return (
      <>
        <ThumbUpOffAltIcon fontSize='small' />
        &nbsp;Like
      </>
    )
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
      }}>
      <CardMedia
        sx={{
          height: 0,
          paddingTop: '56.25%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'darken',
        }}
        image={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={post.title}
      />
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
        }}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user?.result?._id === post?.creator && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'white',
          }}>
          <Button
            style={{
              color: 'white',
            }}
            size='small'
            onClick={() => setCurrentId(post._id)}>
            <EditIcon fontSize='default' />
          </Button>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px',
        }}>
        <Typography variant='body2' color='gray' component='h2'>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        sx={{ padding: '0 16px' }}
        gutterBottom
        variant='h5'
        component='h2'>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body1' color='black' component='p'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: '0 16px 8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button
            size='small'
            color='primary'
            onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post
