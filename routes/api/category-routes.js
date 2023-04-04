const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const cat = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
          {
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
      ]
    })
    res.json(cat)
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Sorry something went wrong!"});
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const cat = await Category.findOne({
      where: {
          id: req.params.id
      },
      attributes: ['id', 'category_name'],
      include: [
          {
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
      ]
    })
    if(cat){
      res.json(cat)
    }else{
      res.status(404).json("No category found!");
    }
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Sorry something went wrong!"});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const cat = await Category.create({
      category_name: req.body.category_name
    });
    res.json(cat)
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Sorry something went wrong!"});
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const cat = await Category.update(req.body, {
                        where: {
                          id: req.params.id
                        }
                      });
    if(cat[0]){                  
      res.json(cat);
    }else{
      res.status(404).json({ message: "Sorry cannot find category"})
    }
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Sorry something went wrong!"});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const cat = await Category.destroy({
                    where: {
                        id: req.params.id
                    }
                });
    if(cat){            
      res.json(cat);
    }else{
      res.status(404).json({ message: "Sorry cannot find category"})
    }  
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Sorry something went wrong!"});
  }
});

module.exports = router;
