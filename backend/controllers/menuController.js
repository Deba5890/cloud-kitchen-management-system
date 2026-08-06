const Menu = require("../models/Menu");

// Add Menu Item
const addMenu = async (req, res) => {
  try {
    const menu = await Menu.create({
  name: req.body.name,
  category: req.body.category,
  price: req.body.price,
  description: req.body.description,
  image: req.file ? req.file.path : "",
});

    res.status(201).json({
      success: true,
      message: "Menu Item Added Successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Menu Items
const getAllMenu = async (req, res) => {
  try {
    const {
      category,
      sort,
      page = 1,
      limit,
    } = req.query;

    // Filter
    let filter = {};

    if (category) {
      filter.category = category;
    }

    // Create query
    let query = Menu.find(filter);

   // Sorting
if (sort === "low") {
  query = query.sort({ price: 1 }); // Lowest price first
} else if (sort === "high") {
  query = query.sort({ price: -1 }); // Highest price first
} else if (sort === "latest") {
  query = query.sort({ createdAt: -1 }); // Newest items first
} else {
  query = query.sort({ createdAt: -1 }); // Default sorting
}

    // Pagination
    if (limit) {
    const skip = (Number(page) - 1) * Number(limit);
    query = query.skip(skip).limit(Number(limit));
    }

    const menu = await query;

    res.status(200).json({
      success: true,
      count: menu.length,
      page: Number(page),
      menu,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Menu Item
const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu Item Not Found",
      });
    }

    res.status(200).json({
      success: true,
      menu,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu Item Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu Updated Successfully",
      menu
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu Item Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const searchMenu = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const menu = await Menu.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      count: menu.length,
      menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addMenu,
  getAllMenu,
  searchMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
};