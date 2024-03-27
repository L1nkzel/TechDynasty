import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import {
  useAddReviewMutation,
  useToggleReviewDislikeMutation,
  useToggleReviewLikeMutation,
} from "../slices/productsApiSlice";
import { useEffect, useState } from "react";
import { ProductType } from "../types";
import { Colors } from "../assets/styles/styles";
import RatingComp from "./Rating";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Reviews = ({
  product,
  productId,
  refetch,
}: {
  product: ProductType;
  productId: string;
  refetch: () => void;
}) => {
  const [addReview, { isLoading: loadingReview }] = useAddReviewMutation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const submitReview = async (e: any) => {
    e.preventDefault();

    await addReview({
      productId,
      rating,
      comment,
    })
      .unwrap()
      .then((data) => console.log("Review added successfully", data))
      .catch((err) => console.log("Error adding review", err));
    refetch();

    setRating(0);
    setComment("");
  };

  const [userLike, setUserLike] = useState<{ [key: string]: number }>({});
  const [userDislike, setUserDislike] = useState<{ [key: string]: number }>({});
  const [toggleLike] = useToggleReviewLikeMutation();
  const [toggleDislike] = useToggleReviewDislikeMutation();

  const handleLike = async (productId: string, reviewId: string) => {
    try {
      await toggleLike({ productId, reviewId }).unwrap();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDislike = async (productId: string, reviewId: string) => {
    try {
      await toggleDislike({ productId, reviewId }).unwrap();
    } catch (error) {
      console.error("Error toggling dislike:", error);
    }
  };

  useEffect(() => {
    if (product) {
      const updatedUserLike: { [key: string]: number } = {};
      const updatedUserDislike: { [key: string]: number } = {};

      product.reviews.forEach((review: any) => {
        updatedUserLike[review._id] = review.likes.length;
        updatedUserDislike[review._id] = review.dislikes.length;
      });

      setUserLike(updatedUserLike);
      setUserDislike(updatedUserDislike);
    }
  }, [product]);

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        {loadingReview && <CircularProgress />}
        <Divider sx={{ mt: 2, mb: 2 }} />
        {product.reviews &&
          product.reviews.map((review: any) => (
            <Box key={review._id} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <RatingComp value={review.rating} iconFontSize={20} />
                <Typography
                  sx={{ fontSize: 14, fontWeight: 400, mt: 1, mb: 1 }}
                >
                  {review.createdAt.substring(0, 10)}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 1, mb: 1 }}>
                {review.name}
              </Typography>
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {review.comment}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => handleLike(productId, review._id)}
                    size="small"
                    sx={{
                      ml: 1,
                      color:
                        userLike[review._id] &&
                        review.likes.includes(userInfo?._id)
                          ? "green"
                          : "inherit",
                    }}
                  >
                    {userLike[review._id] &&
                    review.likes.includes(userInfo?._id) ? (
                      <ThumbUpIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <ThumbUpOffAltIcon sx={{ fontSize: 20 }} />
                    )}{" "}
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    {userLike[review._id] || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => handleDislike(productId, review._id)}
                    size="small"
                    sx={{
                      ml: 1,
                      color:
                        userDislike[review._id] &&
                        review.dislikes.includes(userInfo?._id)
                          ? "green"
                          : "inherit",
                    }}
                  >
                    {userDislike[review._id] &&
                    review.dislikes.includes(userInfo?._id) ? (
                      <ThumbDownIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <ThumbDownOffAltIcon sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    {userDislike[review._id] || 0}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mt: 2, mb: 2 }} />
            </Box>
          ))}
        <Box sx={{ mb: 2 }}>
          <TextField
            sx={{ width: "100%" }}
            label="Your Review"
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 400 }}>
            Rate this product:
          </Typography>
          <Rating
            value={rating}
            onChange={(e, newValue: any) => setRating(newValue)}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            sx={{
              textTransform: "none",
              "&:hover": { backgroundColor: Colors.secondaryLight },
              backgroundColor: Colors.secondary,
            }}
            variant="contained"
            disabled={loadingReview}
            onClick={submitReview}
          >
            Submit Review
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Reviews;
