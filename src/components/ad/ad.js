// import React from 'react';
// import { Link } from 'react-router-dom'

// import './ad.css';
// import { link } from 'fs';


// export default class Ad extends React.Component {


//     toggleLike = () => {

//         // console.log(20);


//         if (this.liked) {
//             this.liked = false;
//             this.refs.likeBox.querySelector('path').style.fill = 'black';
//         } else {
//             this.liked = true;
//             this.refs.likeBox.querySelector('path').style.fill = 'red';
//         }



//     }
//     toDelete = () => {
//         this.props.deleteNow(this.props.iterate)

//     }

//     render = () => {

//         return <div className="ad">
//             <Link to={'/addNewAd/' + this.props.iterate}>
//                 <img src={this.props.ad.img} />
//             </Link>
//             <div class="details featured-class">
//                 <span className="likeBox" ref="likeBox" onClick={this.toggleLike}>
//                     <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon">
//                         <path class="rui-77aaa" d="M713.387 128c-104.533 0-164.267 37.12-204.373 118.187-38.115-70.843-111.733-118.187-196.408-118.187-0.1 0-0.201 0-0.301 0l0.016-0c-215.893 0-288.853 289.707-170.667 407.467 48.64 48.213 189.867 197.973 370.347 389.547 196.693-207.787 341.333-357.547 372.053-389.547 116.907-116.053 40.107-407.467-170.667-407.467zM837.12 487.253c-31.147 31.573-136.96 142.080-317.867 333.227l-6.4 6.827-5.973-6.827q-248.32-263.68-318.293-333.227c-85.333-85.333-15.36-291.84 123.733-291.84 81.067 0 148.48 53.333 185.173 151.893l11.947 27.307 11.947-27.307c32.427-107.947 90.027-151.893 192-151.893 135.253-0 209.067 207.36 123.733 291.84z">
//                         </path>
//                     </svg>
//                 </span>
//                 <h2>{this.props.ad.price}</h2>
//                 <p>{this.props.ad.desc}</p>
//                 <div><span>FSD, Punjab</span>
//                     <span>1 days ago</span>
//                 </div>
//                 <button onClick={this.toDelete}>Delete</button>
//                 <button><Link to={"/edit/" + this.props.iterate}>Edit</Link></button>
//             </div>
//             {this.props.ad.featured ? <span class="featured">FEATURED</span> : null}
//         </div>

//     }

// }


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

import services from '../../services';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Bilal
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <Button onClick={() => {

        services.deleteAd(props.ad._id);

      }}>Delete</Button>
      <CardMedia
        className={classes.media}
        image={props.ad.img}
        title="Paella dish"
      />
      <img src={props.ad.img}/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.ad.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>


        </CardContent>
      </Collapse>
    </Card>
  );
}