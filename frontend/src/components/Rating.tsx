import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface RatingProps {
  value: number;
  text?: string;
  iconFontSize?: number;
  style?: any;
   reviewText?: any;
}

const ratingArray = [1, 2, 3, 4, 5];


const Rating: FunctionComponent<RatingProps> = ({ value, text, reviewText, iconFontSize, style }) => {
  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" my={0.5}>
      {ratingArray.map((index) => (
        <Box  key={index} color={"gold"}>
        {value >= index ? (
          <StarIcon sx={{ fontSize: iconFontSize, ...style }}/> 
        ) : value >= index - 0.5 ? (
          <StarHalfIcon sx={{ fontSize: iconFontSize, ...style }}/>
        ) : (
          <StarBorderIcon sx={{ fontSize: iconFontSize, ...style }}/>
        )}
      </Box>
      ))}
      <Typography sx={{...reviewText}} ml={0.5}>{text && text}</Typography>
    </Box>
  );
};

export default Rating;
