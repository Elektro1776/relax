import cx from 'classnames';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from '../../animate';
import MediaItem from '../../media-item';
import Upload from '../../upload';
import Uploads from './uploads';

export default class Content extends Component {
  static fragments = MediaItem.fragments

  static propTypes = {
    onAddMedia: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    media: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.string,
    uploading: PropTypes.bool.isRequired,
    uploadedData: PropTypes.array.isRequired,
    mimeTypes: PropTypes.array.isRequired
  }

  imageClicked (id, event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onItemClick(id);
  }

  render () {
    return (
      <Upload accept={this.props.mimeTypes.toString()} onFile={this.props.onAddMedia} disableClick infos>
        <Uploads uploadedData={this.props.uploadedData} />
        <div className={cx('content-area-scrollable', this.props.view, this.props.uploading && 'uploading')} key={this.props.view}>
          <GeminiScrollbar autoshow>
            {this.renderResults()}
          </GeminiScrollbar>
        </div>
      </Upload>
    );
  }

  renderResults () {
    const {media} = this.props;
    let result;
    if (media && media.length > 0) {
      result = (
        <div>
          {media.map(this.renderMediaItem, this)}
        </div>
      );
    } else {
      result = (
        <Animate transition='slideUpIn'>
          <div className='no-results'>
            <span>No results found</span>
          </div>
        </Animate>
      );
    }
    return result;
  }

  renderMediaItem (item) {
    const width = this.props.view === 'small' ? 100 : 200;
    const height = this.props.view === 'small' ? 100 : 112;
    return (
      <a href='#' className={cx('ms-item', item._id === this.props.selected && 'selected')} key={item._id} onClick={this.imageClicked.bind(this, item._id)}>
        <MediaItem item={item} width={width} height={height} useThumbnail={this.props.view === 'small'} />
      </a>
    );
  }
}