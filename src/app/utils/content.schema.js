/**
 * @fileoverview Defines the schema for portfolio content validation.
 * This file exports an array of required fields that every profile in the
 * content JSON should have.
 */

/**
 * An array of strings representing the required fields for a profile.
 * Dot notation is used for nested properties.
 *
 * @type {string[]}
 */
export const REQUIRED_PROFILE_FIELDS = [
  'meta.company',
  'meta.timeline',
  'meta.tone',
  'meta.cases',
  'profile.greeting_name',
  'profile.summary.title',
  'profile.summary.specialization',
  'profile.status.availability',
  'introduction',
];
