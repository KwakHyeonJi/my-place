import * as THREE from 'three';

export interface Coord {
  x: number;
  y: number;
  z: number;
}

export interface PointSet {
  position: Coord[];
  rotation: Coord[];
}

export class ViewPointSet {
  private width;

  private height;

  private gap;

  constructor(width: number, height: number, gap: number) {
    this.width = width;
    this.height = height;
    this.gap = gap;
  }

  circular(count: number) {
    const pointSet: PointSet = { position: [], rotation: [] };
    const object = new THREE.Object3D();

    const radius = ((this.width + this.gap) * count) / (2 * Math.PI);
    const theta = (2 * Math.PI) / count;
    const thetaStart = Math.PI / 2;

    for (let i = 0; i < count; i += 1) {
      object.position.set(
        radius * Math.cos(theta * i + thetaStart),
        0,
        radius * Math.sin(theta * i + thetaStart)
      );
      object.lookAt(0, 0, 0);
      object.rotateY(Math.PI);

      pointSet.position.push({
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      });
      pointSet.rotation.push({
        x: object.rotation.x,
        y: object.rotation.y,
        z: object.rotation.z,
      });
    }

    return pointSet;
  }

  grid(count: number, column: number) {
    const pointSet: PointSet = { position: [], rotation: [] };

    const startX =
      count < column
        ? ((this.width + this.gap) * (count - 1)) / 2
        : ((this.width + this.gap) * (column - 1)) / 2;
    const startY =
      count < column
        ? 0
        : ((this.height + this.gap) * (Math.ceil(count / column) - 1)) / 2;

    for (let i = 0; i < count; i += 1) {
      pointSet.position.push({
        x: -startX + (i % column) * (this.width + this.gap),
        y: startY - Math.floor(i / column) * (this.height + this.gap),
        z: 0,
      });
      pointSet.rotation.push({
        x: 0,
        y: 0,
        z: 0,
      });
    }

    return pointSet;
  }
}
