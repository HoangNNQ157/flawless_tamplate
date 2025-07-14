import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const getEmoji = (product: string) => {
  if (product.toLowerCase().includes("foundation")) return "💄";
  if (product.toLowerCase().includes("lipstick")) return "👄";
  if (product.toLowerCase().includes("blush")) return "🎨";
  if (product.toLowerCase().includes("powder")) return "🧴";
  return "✨";
};

export default function ProductChips({ productUsed }: { productUsed: string[] }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {productUsed.map((product, index) => (
        <Chip
          key={index}
          label={`${getEmoji(product)} ${product}`}
          variant="outlined"
        />
      ))}
    </Stack>
  );
}
