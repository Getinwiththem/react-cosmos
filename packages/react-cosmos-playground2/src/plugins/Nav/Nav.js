// @flow

import styled from 'styled-components';
import React, { Component } from 'react';
import { FixtureTree } from './FixtureTree';

import type { RendererItemState } from '../Renderer';
import type { UrlParams } from '../Router';
import type { Storage } from '../Storage';

type Props = {
  projectId: string,
  fixturesDir: string,
  urlParams: UrlParams,
  primaryRendererState: null | RendererItemState,
  setUrlParams: (urlParams: UrlParams) => void,
  storage: Storage
};

export class Nav extends Component<Props> {
  render() {
    const {
      projectId,
      fixturesDir,
      urlParams,
      primaryRendererState,
      storage
    } = this.props;

    if (!primaryRendererState) {
      return null;
    }

    const { fixtures } = primaryRendererState;
    const { fixturePath = null, fullScreen } = urlParams;

    if (fullScreen) {
      return null;
    }

    return (
      <Container data-testid="nav">
        <FixtureTree
          projectId={projectId}
          fixturesDir={fixturesDir}
          fixtures={fixtures}
          selectedFixturePath={fixturePath}
          onSelect={this.handleFixtureSelect}
          storage={storage}
        />
      </Container>
    );
  }

  handleFixtureSelect = (fixturePath: string) => {
    this.props.setUrlParams({ fixturePath });
  };
}

const Container = styled.div`
  width: 256px;
  background: var(--grey1);
  border-right: 1px solid var(--darkest);
  overflow: auto;
`;
