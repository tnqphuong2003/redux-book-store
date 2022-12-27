import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { BASE_URL } from "../../app/config";
import { useDispatch, useSelector } from "react-redux";
import { getBook, addReadingBook } from "./bookSlice";

const BookDetail = () => {
  const [addingBook, setAddingBook] = useState(false);
  const params = useParams();
  const bookId = params.id;

  const dispatch = useDispatch();
  const { selectedBook, isLoading } = useSelector((state) => state.book);

  const addToReadingList = (book) => {
    setAddingBook(book);
  };

  useEffect(() => {
    if (!addingBook) return;
    dispatch(addReadingBook(selectedBook));
  }, [addingBook, dispatch]);

  useEffect(() => {
    dispatch(getBook(bookId));
  }, [bookId, dispatch]);

  return (
    <Container>
      {isLoading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {selectedBook && (
              <img
                width="100%"
                src={`${BASE_URL}/${selectedBook.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {selectedBook && (
              <Stack>
                <h2>{selectedBook.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {selectedBook.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {selectedBook.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {selectedBook.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {selectedBook.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {selectedBook.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(selectedBook)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetail;
