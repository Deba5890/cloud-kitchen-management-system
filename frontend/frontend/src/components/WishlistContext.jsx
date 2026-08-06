import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // ==========================
  // Fetch Wishlist
  // ==========================
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No Token Found");
      setWishlist([]);
      return;
    }

    try {
      const res = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Wishlist API Response:", res.data);

      setWishlist(res.data.wishlist || []);
    } catch (error) {
      console.log("Wishlist Error:", error.response?.data || error);
    }
  };

  // ==========================
  // Add Wishlist
  // ==========================
  const addWishlist = async (menuId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await API.post(
        "/wishlist",
        { menuId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      toast.success("❤️ Added to Wishlist");

      fetchWishlist();
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(
        error.response?.data?.message || "Unable to add wishlist"
      );
    }
  };

  // ==========================
  // Remove Wishlist
  // ==========================
  const removeWishlist = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await API.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      toast.info("Removed from Wishlist");

      fetchWishlist();
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(
        error.response?.data?.message || "Unable to remove wishlist"
      );
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    console.log("Wishlist State:", wishlist);
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        fetchWishlist,
        addWishlist,
        removeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);