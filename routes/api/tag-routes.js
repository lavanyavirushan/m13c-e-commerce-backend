const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tag = await Tag.findAll({
		attributes: ['id', 'tag_name'],
		include: [
			{
				model: Product,
				attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
			}
		]
    });
    res.json(tag);
  }catch(err){
	console.log(err)
    res.status(500).json({ message: "Sorry something went wrong!"});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
	const tag = await Tag.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }
        ]
    })
	if(tag){
		res.json(tag);
	}else{
		res.status(404).json({ message: 'No tag found!' });
	}
	
  }catch(err){
	console.log(err);
	res.status(500).json({ message: "Sorry something went wrong!"});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
	const tag = await Tag.create({
        tag_name: req.body.tag_name
    })
	res.json(tag);
  }catch(err){
	console.log(err);
	res.status(500).json({ message: "Sorry something went wrong!"});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
	const tag = await Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
	if(tag[0]){
		res.json(tag);
	}else{
		res.status(404).json({ message: 'No tag found!' });
	}
  }catch(err){
	console.log(err);
	res.status(500).json({ message: "Sorry something went wrong!"});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
	const tag = await Tag.destroy({
        where: {
            id: req.params.id
        }
    })

	if(tag){
		res.json(tag);
	}else{
		res.status(404).json({ message: 'No tag found!' });
	}
  }catch(err){
	console.log(err);
	res.status(500).json({ message: "Sorry something went wrong!"});
  }
});

module.exports = router;
