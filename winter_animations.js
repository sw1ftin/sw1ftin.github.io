function createLowPolySnowflakes(scene, camera) {
    const snowflakes = [];
    const numSnowflakes = 20;

    const colors = [
        new THREE.Color(0xC7E5FF),
        new THREE.Color(0xB4D7FF),
        new THREE.Color(0x99C7FF),
    ];

    function createSnowflakeGeometry(type) {
        const points = [];
        const segments = 6;
        const radius = Math.random() * 15 + 10;
        
        switch(type) {
            case 0:
                for (let i = 0; i < segments; i++) {
                    const angle = (i / segments) * Math.PI * 2;
                    const nextAngle = ((i + 1) / segments) * Math.PI * 2;
                    const midAngle = (angle + nextAngle) / 2;
                    
                    points.push(
                        new THREE.Vector2(0, 0),
                        new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius)
                    );
                    
                    const branchLength = radius * 0.4;
                    const branchAngle1 = angle + Math.PI / 6;
                    const branchAngle2 = angle - Math.PI / 6;
                    const mainPoint = new THREE.Vector2(
                        Math.cos(angle) * (radius * 0.6),
                        Math.sin(angle) * (radius * 0.6)
                    );
                    
                    points.push(
                        mainPoint,
                        new THREE.Vector2(
                            mainPoint.x + Math.cos(branchAngle1) * branchLength,
                            mainPoint.y + Math.sin(branchAngle1) * branchLength
                        )
                    );
                    
                    points.push(
                        mainPoint,
                        new THREE.Vector2(
                            mainPoint.x + Math.cos(branchAngle2) * branchLength,
                            mainPoint.y + Math.sin(branchAngle2) * branchLength
                        )
                    );
                }
                break;
                
            case 1:
                for (let i = 0; i < segments * 2; i++) {
                    const angle = (i / (segments * 2)) * Math.PI * 2;
                    const currentRadius = i % 2 === 0 ? radius : radius * 0.4;
                    points.push(
                        new THREE.Vector2(0, 0),
                        new THREE.Vector2(
                            Math.cos(angle) * currentRadius,
                            Math.sin(angle) * currentRadius
                        )
                    );
                }
                break;
                
            case 2:
                for (let i = 0; i < segments; i++) {
                    const angle = (i / segments) * Math.PI * 2;
                    const nextAngle = ((i + 1) / segments) * Math.PI * 2;
                    
                    points.push(
                        new THREE.Vector2(0, 0),
                        new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius)
                    );
                    
                    const crystal1 = radius * 0.7;
                    const crystal2 = radius * 0.4;
                    const crystalAngle1 = angle + Math.PI / 8;
                    const crystalAngle2 = angle - Math.PI / 8;
                    
                    points.push(
                        new THREE.Vector2(
                            Math.cos(angle) * crystal2,
                            Math.sin(angle) * crystal2
                        ),
                        new THREE.Vector2(
                            Math.cos(crystalAngle1) * crystal1,
                            Math.sin(crystalAngle1) * crystal1
                        )
                    );
                    
                    points.push(
                        new THREE.Vector2(
                            Math.cos(angle) * crystal2,
                            Math.sin(angle) * crystal2
                        ),
                        new THREE.Vector2(
                            Math.cos(crystalAngle2) * crystal1,
                            Math.sin(crystalAngle2) * crystal1
                        )
                    );
                }
                break;
        }

        const shape = new THREE.Shape(points);
        return new THREE.ShapeGeometry(shape);
    }

    for (let i = 0; i < numSnowflakes; i++) {
        const snowflakeType = Math.floor(Math.random() * 3);
        const geometry = createSnowflakeGeometry(snowflakeType);
        const material = new THREE.MeshBasicMaterial({
            color: colors[i % colors.length],
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
            wireframe: true,
            wireframeLinewidth: 0.5
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        const outlineMaterial = new THREE.MeshBasicMaterial({
            color: 0x4B92DB,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3,
            wireframe: false
        });
        const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
        mesh.add(outlineMesh);
        
        mesh.position.set(
            Math.random() * window.innerWidth - window.innerWidth / 2,
            window.innerHeight / 2,
            0
        );

        const scale = Math.random() * 0.5 + 0.5;
        mesh.scale.set(scale, scale, scale);

        scene.add(mesh);
        snowflakes.push({
            mesh: mesh,
            rotationSpeed: Math.random() * 0.01 - 0.005,
            fallSpeed: Math.random() * 0.5 + 0.5,
            wobbleSpeed: Math.random() * 0.01,
            wobbleAmount: Math.random() * 10 + 5,
            initialX: mesh.position.x
        });
    }

    return function animate() {
        snowflakes.forEach(snowflake => {
            snowflake.mesh.rotation.z += snowflake.rotationSpeed;

            const wobble = Math.sin(Date.now() * snowflake.wobbleSpeed) * snowflake.wobbleAmount;
            snowflake.mesh.position.x = snowflake.initialX + wobble;
            
            snowflake.mesh.position.y -= snowflake.fallSpeed;

            if (snowflake.mesh.position.y < -window.innerHeight / 2) {
                snowflake.mesh.position.y = window.innerHeight / 2;
                snowflake.initialX = Math.random() * window.innerWidth - window.innerWidth / 2;
                snowflake.mesh.position.x = snowflake.initialX;
            }
        });
    };
}

function isWinterSeason() {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    
    return (month === 11 && day >= 15) || (month === 0 && day <= 15);
}

function getRandomAnimation() {
    return createLowPolySnowflakes;
}

export { getRandomAnimation, isWinterSeason }; 