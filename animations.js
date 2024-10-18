function createMaterialDesignShapes(scene, camera) {
    const shapes = [];
    const numShapes = 15;

    const colors = [
        new THREE.Color(0x6200ee),
        new THREE.Color(0x3700b3),
        new THREE.Color(0x03dac6),
        new THREE.Color(0xbb86fc),
        new THREE.Color(0x018786)
    ];

    for (let i = 0; i < numShapes; i++) {
        const isSquare = Math.random() > 0.5;
        const width = isSquare ? 40 : Math.random() * 40 + 20;
        const height = isSquare ? width : Math.random() * 40 + 20;
        const cornerRadius = Math.min(width, height) * 0.2;

        const shape = new THREE.Shape();
        shape.moveTo(0, cornerRadius);
        shape.lineTo(0, height - cornerRadius);
        shape.quadraticCurveTo(0, height, cornerRadius, height);
        shape.lineTo(width - cornerRadius, height);
        shape.quadraticCurveTo(width, height, width, height - cornerRadius);
        shape.lineTo(width, cornerRadius);
        shape.quadraticCurveTo(width, 0, width - cornerRadius, 0);
        shape.lineTo(cornerRadius, 0);
        shape.quadraticCurveTo(0, 0, 0, cornerRadius);

        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
            color: colors[i % colors.length],
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            Math.random() * window.innerWidth - window.innerWidth / 2,
            Math.random() * window.innerHeight - window.innerHeight / 2,
            0
        );

        scene.add(mesh);
        shapes.push({
            mesh: mesh,
            rotationSpeed: Math.random() * 0.02 - 0.01,
            positionSpeed: new THREE.Vector2(
                Math.random() * 0.5 - 0.25,
                Math.random() * 0.5 - 0.25
            )
        });
    }

    return function animate() {
        shapes.forEach(shape => {
            shape.mesh.rotation.z += shape.rotationSpeed;

            shape.mesh.position.x += shape.positionSpeed.x;
            shape.mesh.position.y += shape.positionSpeed.y;

            if (Math.abs(shape.mesh.position.x) > window.innerWidth / 2) shape.positionSpeed.x *= -1;
            if (Math.abs(shape.mesh.position.y) > window.innerHeight / 2) shape.positionSpeed.y *= -1;
        });
    };
}

function getRandomAnimation() {
    return createMaterialDesignShapes;
}

export { getRandomAnimation };
