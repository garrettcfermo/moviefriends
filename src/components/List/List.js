import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton'
import DeleteRounded from '@material-ui/icons/DeleteRounded'


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  }
})

class List extends Component {

  state = {
    expanded: null,
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  };


  render() {
    const { classes } = this.props
    const { expanded } = this.state

    console.log(this.props.favorites)


    return (
      <>
      {
        this.props.favorites.map(movie => (
          <Grid container spacing={8} style={{ marginTop: '2vh' }}>
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <img src={movie.Poster} alt={movie.Title} />
            </Grid>
            <Grid item xs={5} className={classes.root}>
              <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary>
                  <Typography className={classes.heading}>Title</Typography>
                  <Typography className={classes.secondaryHeading}>{movie.Title}</Typography>
                </ExpansionPanelSummary>
              </ExpansionPanel>
              <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary>
                  <Typography className={classes.heading}>Director</Typography>
                  <Typography className={classes.secondaryHeading}>{movie.Director}</Typography>
                </ExpansionPanelSummary>
              </ExpansionPanel>
              <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary>
                  <Typography className={classes.heading}>Release Date</Typography>
                  <Typography className={classes.secondaryHeading}>{movie.Released}</Typography>
                </ExpansionPanelSummary>
              </ExpansionPanel>
              <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary>
                  <Typography className={classes.heading}>Rated</Typography>
                  <Typography className={classes.secondaryHeading}>{movie.Rated}</Typography>
                </ExpansionPanelSummary>
              </ExpansionPanel>
              <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary>
                  <Typography className={classes.heading}>Runtime</Typography>
                  <Typography className={classes.secondaryHeading}>{movie.Runtime}</Typography>
                </ExpansionPanelSummary>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Plot</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Click To View The Plot Of The Movie
            </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {movie.Plot}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Actors</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Click To View A List of the Actors
            </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {movie.Actors}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Writers</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Click To View A List of the Writers
            </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {movie.Writer}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={false}>
                <ExpansionPanelSummary>
                  <Typography className={classes.secondaryHeading}>
                    <IconButton>
                      <DeleteRounded  onClick={() => this.props.removeMovieFromFavorites(movie)} />
                    </IconButton>
                  </Typography>
                </ExpansionPanelSummary>
              </ExpansionPanel>
            </Grid>
          </Grid>
        ))
      }
      </>
    )
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(List)
