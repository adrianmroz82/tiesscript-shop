import { useCallback } from 'react';

import { decrementCartQuantity, incrementCartQuantity, removeFromCart } from '@/store/features/cartSlice';
import { useAppDispatch } from '@/store/utils/redux-hooks';

export function useCartActions() {
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = useCallback(
    (id: number) => {
      dispatch(incrementCartQuantity(id));
    },
    [dispatch]
  );

  const handleDecrementQuantity = useCallback(
    (id: number) => {
      dispatch(decrementCartQuantity(id));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  return { handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem };
}
