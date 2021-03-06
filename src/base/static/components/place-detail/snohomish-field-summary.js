import React from "react";
import PropTypes from "prop-types";

import fieldResponseFilter from "../../utils/field-response-filter";
import { Header1, Header4, Paragraph } from "../atoms/typography";
import CoverImage from "../molecules/cover-image";

import { placePropType } from "../../state/ducks/places";

import constants from "../../constants";

const filterStage = (fieldConfigs, stageName) => {
  return fieldConfigs
    .filter(fieldConfig => fieldConfig.name.startsWith(stageName))
    .map(fieldConfig => (
      <Paragraph classes="snohomish-completed-action" key={fieldConfig.name}>
        {fieldConfig.content[0].label}
      </Paragraph>
    ));
};

const SnohomishFieldSummary = props => {
  const fieldConfigs = fieldResponseFilter(props.fields, props.place).filter(
    fieldConfig =>
      fieldConfig.type === constants.BIG_TOGGLE_FIELD_TYPENAME &&
      props.place[fieldConfig.name] === "yes",
  );
  const stages = {
    farm: filterStage(fieldConfigs, "farm"),
    forest: filterStage(fieldConfigs, "forest"),
    urban: filterStage(fieldConfigs, "urban"),
    shoreline: filterStage(fieldConfigs, "shoreline"),
    general: filterStage(fieldConfigs, "general"),
  };

  return (
    <div className="snohomish-field-summary">
      <Header1 classes="snohomish-total-actions">
        <span className="snohomish-num-actions">{fieldConfigs.length}</span>{" "}
        {fieldConfigs.length === 1 ? "action" : "actions"}
      </Header1>
      {props.place.attachments
        .filter(attachment => attachment.type === "CO")
        .map((attachment, i) => (
          <CoverImage key={i} imageUrl={attachment.file} />
        ))}
      {stages.farm.length > 0 && (
        <div className="snohomish-stage-summary">
          <Header4 classes="snohomish-stage-action-summary">
            Farm conservation actions
          </Header4>
          {stages.farm}
        </div>
      )}
      {stages.forest.length > 0 && (
        <div className="snohomish-stage-summary">
          <Header4 classes="snohomish-stage-action-summary">
            Forest conservation actions
          </Header4>
          {stages.forest}
        </div>
      )}
      {stages.urban.length > 0 && (
        <div className="snohomish-stage-summary">
          <Header4 classes="snohomish-stage-action-summary">
            Urban conservation actions
          </Header4>
          {stages.urban}
        </div>
      )}
      {stages.shoreline.length > 0 && (
        <div className="snohomish-stage-summary">
          <Header4 classes="snohomish-stage-action-summary">
            Shoreline conservation actions
          </Header4>
          {stages.shoreline}
        </div>
      )}
      {stages.general.length > 0 && (
        <div className="snohomish-stage-summary">
          <Header4 classes="snohomish-stage-action-summary">
            General conservation actions
          </Header4>
          {stages.general}
        </div>
      )}
    </div>
  );
};

SnohomishFieldSummary.propTypes = {
  fields: PropTypes.array.isRequired,
  place: placePropType.isRequired,
};

export default SnohomishFieldSummary;
