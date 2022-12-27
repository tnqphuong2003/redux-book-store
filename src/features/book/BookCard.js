import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../app/config";

function BookCard({ book }) {
  const navigate = useNavigate();
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };
  return (
    <Card
      key={book.id}
      onClick={() => handleClickBook(book.id)}
      sx={{
        width: "12rem",
        height: "27rem",
        marginBottom: "2rem",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={`${BASE_URL}/${book.imageLink}`}
          alt={`${book.title}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${book.title}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BookCard;
