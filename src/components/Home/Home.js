import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import IconButton from '@material-ui/core/IconButton'
import FavoriteRounded from '@material-ui/icons/FavoriteRounded'
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


class Home extends Component {

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

    return (
      <>
      {
        !this.props.movie ? (
            <Stepper activeStep={-1}>
                  <Step>
                    <StepLabel>Search For A Movie By Its Title</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Look Over Movie Information</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Add Movie To Your List</StepLabel>
                  </Step>
            </Stepper>
        ) :
          (
            <Grid container spacing={8} style={{marginTop: '2vh'}}>
              <Grid item xs={6} style={{textAlign:'center'}}>
                <img src={this.props.movie.Poster} alt={this.props.movie.Title} />
              </Grid>
              <Grid item xs={5}  className={classes.root}>
                <ExpansionPanel expanded={false}>
                  <ExpansionPanelSummary>
                    <Typography className={classes.heading}>Title</Typography>
                    <Typography className={classes.secondaryHeading}>{this.props.movie.Title}</Typography>
                  </ExpansionPanelSummary>
                </ExpansionPanel>
                <ExpansionPanel expanded={false}>
                  <ExpansionPanelSummary>
                    <Typography className={classes.heading}>Director</Typography>
                    <Typography className={classes.secondaryHeading}>{this.props.movie.Director}</Typography>
                  </ExpansionPanelSummary>
                </ExpansionPanel>
                <ExpansionPanel expanded={false}>
                  <ExpansionPanelSummary>
                    <Typography className={classes.heading}>Release Date</Typography>
                    <Typography className={classes.secondaryHeading}>{this.props.movie.Released}</Typography>
                  </ExpansionPanelSummary>
                </ExpansionPanel>
                <ExpansionPanel expanded={false}>
                  <ExpansionPanelSummary>
                    <Typography className={classes.heading}>Rated</Typography>
                    <Typography className={classes.secondaryHeading}>{this.props.movie.Rated}</Typography>
                  </ExpansionPanelSummary>
                </ExpansionPanel>
                <ExpansionPanel expanded={false}>
                  <ExpansionPanelSummary>
                    <Typography className={classes.heading}>Runtime</Typography>
                    <Typography className={classes.secondaryHeading}>{this.props.movie.Runtime}</Typography>
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
                      {this.props.movie.Plot}
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
                      {this.props.movie.Actors}
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
                      {this.props.movie.Writer}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                  <ExpansionPanel expanded={false}>
                    <ExpansionPanelSummary>
                      <Typography className={classes.secondaryHeading}>
                      <IconButton>
                        <FavoriteRounded onClick={this.props.favMovie}/>
                      </IconButton>
                      <IconButton>
                        <DeleteRounded onClick={this.props.removeMovie}/>
                      </IconButton>
                      </Typography>
                    </ExpansionPanelSummary>
                  </ExpansionPanel>
              </Grid>
            </Grid>
          )
      }
      </>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)







