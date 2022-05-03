// @flow

import {
    Uniform1i,
    Uniform2f,
    Uniform4f,
    UniformMatrix4f,
    Uniform1f,
    UniformMatrix3f
} from '../render/uniform_binding.js';
import browser from '../util/browser.js';

import type Context from '../gl/context.js';
import type {UniformValues, UniformLocations} from '../render/uniform_binding.js';

export type GlobeRasterUniformsType = {|
    'u_proj_matrix': UniformMatrix4f,
    'u_globe_matrix': UniformMatrix4f,
    'u_merc_matrix': UniformMatrix4f,
    'u_zoom_transition': Uniform1f,
    'u_merc_center': Uniform2f,
    'u_image0': Uniform1i,
    'u_grid_matrix': UniformMatrix3f
|};

export type AtmosphereUniformsType = {|
    'u_horizon': Uniform1f,
    'u_transition': Uniform1f,
    'u_fadeout_range': Uniform1f,
    'u_color': Uniform4f,
    'u_high_color': Uniform4f,
    'u_space_color': Uniform4f,
    'u_star_intensity': Uniform1f,
    'u_star_size': Uniform1f,
    'u_horizon_angle': Uniform1f,
    'u_rotation_matrix': UniformMatrix4f
|};

const globeRasterUniforms = (context: Context, locations: UniformLocations): GlobeRasterUniformsType => ({
    'u_proj_matrix': new UniformMatrix4f(context, locations.u_proj_matrix),
    'u_globe_matrix': new UniformMatrix4f(context, locations.u_globe_matrix),
    'u_merc_matrix': new UniformMatrix4f(context, locations.u_merc_matrix),
    'u_zoom_transition': new Uniform1f(context, locations.u_zoom_transition),
    'u_merc_center': new Uniform2f(context, locations.u_merc_center),
    'u_image0': new Uniform1i(context, locations.u_image0),
    'u_grid_matrix': new UniformMatrix3f(context, locations.u_grid_matrix)
});

const atmosphereUniforms = (context: Context, locations: UniformLocations): AtmosphereUniformsType => ({
    'u_horizon': new Uniform1f(context, locations.u_horizon),
    'u_transition': new Uniform1f(context, locations.u_transition),
    'u_fadeout_range': new Uniform1f(context, locations.u_fadeout_range),
    'u_color': new Uniform4f(context, locations.u_color),
    'u_high_color': new Uniform4f(context, locations.u_high_color),
    'u_space_color': new Uniform4f(context, locations.u_space_color),
    'u_star_intensity': new Uniform1f(context, locations.u_star_intensity),
    'u_star_size': new Uniform1f(context, locations.u_star_size),
    'u_horizon_angle': new Uniform1f(context, locations.u_horizon_angle),
    'u_rotation_matrix': new UniformMatrix4f(context, locations.u_rotation_matrix)
});

const globeRasterUniformValues = (
    projMatrix: Array<number>,
    globeMatrix: Float32Array,
    globeMercatorMatrix: Float32Array,
    zoomTransition: number,
    mercCenter: [number, number],
    gridMatrix: ?Array<number>
): UniformValues<GlobeRasterUniformsType> => ({
    'u_proj_matrix': Float32Array.from(projMatrix),
    'u_globe_matrix': globeMatrix,
    'u_merc_matrix': globeMercatorMatrix,
    'u_zoom_transition': zoomTransition,
    'u_merc_center': mercCenter,
    'u_image0': 0,
    'u_grid_matrix': gridMatrix ? Float32Array.from(gridMatrix) : new Float32Array(9)
});

const atmosphereUniformValues = (
    horizon: number,
    transitionT: number,
    fadeoutRange: number,
    color: [number, number, number, number],
    highColor: [number, number, number, number],
    spaceColor: [number, number, number, number],
    starIntensity: number,
    horizonAngle: number,
    rotationMatrix: Float32Array
): UniformValues<AtmosphereUniformsType> => ({
    'u_horizon': horizon,
    'u_transition': transitionT,
    'u_fadeout_range': fadeoutRange,
    'u_color': color,
    'u_high_color': highColor,
    'u_space_color': spaceColor,
    'u_star_intensity': starIntensity,
    'u_star_size': 5.0 * browser.devicePixelRatio,
    'u_horizon_angle': horizonAngle,
    'u_rotation_matrix': rotationMatrix
});

export {globeRasterUniforms, globeRasterUniformValues, atmosphereUniforms, atmosphereUniformValues};

export type GlobeDefinesType = 'PROJECTION_GLOBE_VIEW' | 'GLOBE_POLES';
