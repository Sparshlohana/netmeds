import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Rating } from '@mui/material';

const reviews = [
  {
    name: 'Charles A. Hoard',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Lorem ipsum dolor sit amet consectetur. Sit posuere sodales scelerisque et molestie. Nisl vitae eu pharetra aliquet vel nisi faucibus. Vel malesuada eu sed auctor. Aliquam tincidunt egestas consequat dui quam aenean faucibus. Tincidunt sit sagittis integer placerat rutrum volutpat cursus. Mauris sollicitudin volutpat metus orci blandit ac quis nibh quisque.',
    date: '15/06/2022',
    rating: 5,
  },
  {
    name: 'Charles A. Hoard',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Lorem ipsum dolor sit amet consectetur. Sit posuere sodales scelerisque et molestie. Nisl vitae eu pharetra aliquet vel nisi faucibus. Vel malesuada eu sed auctor. Aliquam tincidunt egestas consequat dui quam aenean faucibus. Tincidunt sit sagittis integer placerat rutrum volutpat cursus. Mauris sollicitudin volutpat metus orci blandit ac quis nibh quisque.',
    date: '15/06/2022',
    rating: 5,
  },
  {
    name: 'Charles A. Hoard',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Lorem ipsum dolor sit amet consectetur. Sit posuere sodales scelerisque et molestie. Nisl vitae eu pharetra aliquet vel nisi faucibus. Vel malesuada eu sed auctor. Aliquam tincidunt egestas consequat dui quam aenean faucibus. Tincidunt sit sagittis integer placerat rutrum volutpat cursus. Mauris sollicitudin volutpat metus orci blandit ac quis nibh quisque.',
    date: '15/06/2022',
    rating: 5,
  },
];

const HomeReviews = () => {
  return (
    <div className="py-16 bg-blue-50">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">What Our Customers Say</h2>
      <div className="flex justify-center flex-wrap space-x-4 px-4">
        {reviews.map((review, index) => (
          <Card key={index} className="max-w-xs mb-8 rounded-lg shadow-lg">
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar src={review.avatar} alt={review.name} sx={{ width: 60, height: 60 }} />
                <Box>
                  <Typography variant="h6" className="font-bold">{review.name}</Typography>
                  <Rating name="read-only" value={review.rating} readOnly size="small" />
                </Box>
              </div>
              <Typography variant="body2" className="text-gray-600 mb-4">{review.text}</Typography>
              <Box className="flex justify-between items-center text-sm text-gray-500">
                <Typography>{review.date}</Typography>
                <Rating name="read-only" value={review.rating} readOnly size="small" />
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-4">
        <Typography variant="body2" className="text-gray-500">
          Google rating score: 4.5 of 5, based on 24 reviews.
        </Typography>
      </div>
    </div>
  );
};

export default HomeReviews;