// Animación de red neuronal con formas nítidas
class NeuralAnimation {
    constructor() {
        this.canvas = document.getElementById('neural-network');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Configuración de la red neuronal
        this.nodes = [];
        this.connections = [];
        this.nodeCount = 250; // Aumentado para mejor definición
        
        // Colores para cada forma - colores más vivos y saturados
        this.themeColors = {
            btc: {
                primary: '#F7931A', // Naranja Bitcoin
                secondary: '#FFAE42'
            },
            eth: {
                primary: '#627EEA', // Azul Ethereum
                secondary: '#8A9EFF'
            },
            gold: {
                primary: '#D4AF37', // Dorado
                secondary: '#FFD700'
            },
            security: {
                primary: '#46A049', // Verde seguridad
                secondary: '#6EC071'
            },
            messaging: {
                primary: '#1DA1F2', // Azul mensaje
                secondary: '#69C4FF'
            },
            erp: {
                primary: '#9C27B0', // Púrpura para ERP
                secondary: '#CE93D8'
            }
        };
        
        // Formas
        this.shapes = {
            btc: [], // Bitcoin
            eth: [], // Ethereum
            gold: [], // PAX Gold
            security: [], // Ciberseguridad
            messaging: [], // Mensajería
            erp: [] // ERP
        };
        
        this.currentShape = null;
        this.currentTheme = null;
        this.shapeLabel = "";
        this.shapeCycleTime = 5000; // ms por forma (más rápido)
        this.lastShapeChange = 0;
        
        this.initializeShapes();
        this.initializeNodes();
        this.initializeConnections();
        
        this.lastTime = 0;
        
        // Iniciar la animación
        requestAnimationFrame(this.animate.bind(this));
    }
    
    initializeShapes() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const baseRadius = Math.min(this.width, this.height) * 0.4;
        
        // -------- BITCOIN (Solo el símbolo ₿ sin círculo) --------
        this.createBitcoinShape(centerX, centerY, baseRadius);
        
        // -------- ETHEREUM (Símbolo de ETH) --------
        this.createEthereumShape(centerX, centerY, baseRadius);
        
        // -------- PAX GOLD (Lingote de oro) --------
        this.createGoldShape(centerX, centerY, baseRadius);
        
        // -------- CIBERSEGURIDAD (Candado con escudo) --------
        this.createSecurityShape(centerX, centerY, baseRadius);
        
        // -------- MENSAJERÍA (Sistema de mensajes) --------
        this.createMessagingShape(centerX, centerY, baseRadius);
        
        // -------- ERP (Engranaje con gráficos) --------
        this.createERPShape(centerX, centerY, baseRadius);
    }
    
    // Métodos separados para crear cada forma con alta definición
    createBitcoinShape(centerX, centerY, radius) {
        // Solo el símbolo ₿ sin círculo exterior
        const symbolWidth = radius * 1.2;
        const symbolHeight = radius * 1.8;
        
        // Línea vertical principal
        for (let i = 0; i < 40; i++) {
            const t = i / 39;
            this.shapes.btc.push({
                x: centerX,
                y: centerY - symbolHeight/2 + t * symbolHeight
            });
        }
        
        // Líneas horizontales del ₿ (dos líneas)
        const horizontalLines = [
            { y: centerY - symbolHeight/4, widthFactor: 0.6 },
            { y: centerY + symbolHeight/4, widthFactor: 0.6 }
        ];
        
        horizontalLines.forEach(line => {
            for (let i = 0; i < 25; i++) {
                const t = i / 24;
                this.shapes.btc.push({
                    x: centerX + (t - 0.5) * symbolWidth * line.widthFactor,
                    y: line.y
                });
            }
        });
        
        // Parte curva superior de la B
        this.addArc(
            this.shapes.btc,
            centerX,
            centerY - symbolHeight/8,
            symbolWidth * 0.35,
            Math.PI * 1.5,
            Math.PI * 2.5,
            30
        );
        
        // Parte curva inferior de la B
        this.addArc(
            this.shapes.btc,
            centerX,
            centerY + symbolHeight/8,
            symbolWidth * 0.35,
            Math.PI * 1.5,
            Math.PI * 2.5,
            30
        );
        
        // Agregar puntos adicionales para reforzar la forma
        this.shapes.btc = this.shapes.btc.concat(this.shapes.btc.map(point => ({
            x: point.x + (Math.random() - 0.5) * 2,
            y: point.y + (Math.random() - 0.5) * 2
        })));
    }
    
    createEthereumShape(centerX, centerY, radius) {
        // Forma del símbolo de Ethereum
        const width = radius * 1.2;
        const height = radius * 2;
        
        // Parte superior (triángulo invertido)
        for (let i = 0; i < 50; i++) {
            const t = i / 49;
            // Línea izquierda
            this.shapes.eth.push({
                x: centerX - width/2 + t * width/2,
                y: centerY - height/2 + t * height/2
            });
            // Línea derecha
            this.shapes.eth.push({
                x: centerX + width/2 - t * width/2,
                y: centerY - height/2 + t * height/2
            });
        }
        
        // Parte inferior (triángulo)
        for (let i = 0; i < 50; i++) {
            const t = i / 49;
            // Línea izquierda
            this.shapes.eth.push({
                x: centerX - width/2 + t * width/2,
                y: centerY + t * height/2
            });
            // Línea derecha
            this.shapes.eth.push({
                x: centerX + width/2 - t * width/2,
                y: centerY + t * height/2
            });
        }
        
        // Línea horizontal en el centro
        for (let i = 0; i < 30; i++) {
            const t = i / 29;
            this.shapes.eth.push({
                x: centerX - width/2 + t * width,
                y: centerY
            });
        }
    }
    
    createGoldShape(centerX, centerY, radius) {
        // Forma de lingote de oro
        const lingoteWidth = radius * 1.6;
        const lingoteHeight = radius * 0.8;
        const cornerRadius = radius * 0.15;
        
        // Contorno del lingote (rectángulo con esquinas redondeadas)
        this.addRoundedRect(
            this.shapes.gold,
            centerX - lingoteWidth/2, 
            centerY - lingoteHeight/2,
            lingoteWidth,
            lingoteHeight,
            cornerRadius
        );
        
        // Líneas de relieve (para dar sensación de 3D)
        for (let i = 0; i < 3; i++) {
            const offsetY = (i - 1) * lingoteHeight * 0.2;
            
            // Línea horizontal
            for (let j = 0; j < 40; j++) {
                const t = j / 39;
                this.shapes.gold.push({
                    x: centerX - lingoteWidth * 0.45 + t * lingoteWidth * 0.9,
                    y: centerY + offsetY
                });
            }
        }
        
        // Letras AU (símbolo químico del oro)
        // Letra A
        const aPoints = [
            {x: centerX - lingoteWidth * 0.25, y: centerY + lingoteHeight * 0.25},
            {x: centerX - lingoteWidth * 0.15, y: centerY - lingoteHeight * 0.25},
            {x: centerX - lingoteWidth * 0.05, y: centerY + lingoteHeight * 0.25}
        ];
        
        // Dibujar la A
        for (let i = 0; i < aPoints.length - 1; i++) {
            const start = aPoints[i];
            const end = aPoints[i+1];
            for (let j = 0; j < 10; j++) {
                const t = j / 9;
                this.shapes.gold.push({
                    x: start.x + t * (end.x - start.x),
                    y: start.y + t * (end.y - start.y)
                });
            }
        }
        
        // Línea horizontal de la A
        for (let i = 0; i < 10; i++) {
            const t = i / 9;
            this.shapes.gold.push({
                x: centerX - lingoteWidth * 0.22 + t * lingoteWidth * 0.14,
                y: centerY
            });
        }
        
        // Letra U
        const uStartY = centerY - lingoteHeight * 0.25;
        
        // Lado izquierdo de la U
        for (let i = 0; i < 15; i++) {
            const t = i / 14;
            this.shapes.gold.push({
                x: centerX + lingoteWidth * 0.1,
                y: uStartY + t * lingoteHeight * 0.5
            });
        }
        
        // Base de la U
        for (let i = 0; i < 15; i++) {
            const t = i / 14;
            this.shapes.gold.push({
                x: centerX + lingoteWidth * 0.1 + t * lingoteWidth * 0.1,
                y: centerY + lingoteHeight * 0.25
            });
        }
        
        // Lado derecho de la U
        for (let i = 0; i < 15; i++) {
            const t = i / 14;
            this.shapes.gold.push({
                x: centerX + lingoteWidth * 0.2,
                y: centerY + lingoteHeight * 0.25 - t * lingoteHeight * 0.5
            });
        }
        
        // Brillos (detalles)
        for (let i = 0; i < 2; i++) {
            const shineX = centerX - lingoteWidth * 0.35 + i * lingoteWidth * 0.7;
            const shineY = centerY - lingoteHeight * 0.3;
            const shineRadius = radius * 0.06;
            
            this.addArc(
                this.shapes.gold,
                shineX,
                shineY,
                shineRadius,
                0,
                Math.PI * 2,
                12
            );
        }
    }
    
    createSecurityShape(centerX, centerY, radius) {
        // Escudo base
        const shieldWidth = radius * 1.5;
        const shieldHeight = radius * 1.8;
        const shieldTop = centerY - shieldHeight * 0.45;
        const shieldBottom = centerY + shieldHeight * 0.55;
        
        // Contorno del escudo
        // Parte superior (arco)
        this.addArc(
            this.shapes.security,
            centerX,
            shieldTop + shieldWidth/4,
            shieldWidth/2,
            Math.PI,
            Math.PI * 2,
            25
        );
        
        // Lados del escudo
        for (let i = 0; i < 30; i++) {
            const t = i / 29;
            const tSq = t * t; // Para crear curva en lugar de línea recta
            
            // Lado izquierdo
            this.shapes.security.push({
                x: centerX - shieldWidth/2 + tSq * shieldWidth/4,
                y: shieldTop + shieldWidth/4 + t * (shieldBottom - shieldTop - shieldWidth/4)
            });
            
            // Lado derecho
            this.shapes.security.push({
                x: centerX + shieldWidth/2 - tSq * shieldWidth/4,
                y: shieldTop + shieldWidth/4 + t * (shieldBottom - shieldTop - shieldWidth/4)
            });
        }
        
        // Base del escudo (unir los puntos inferiores)
        for (let i = 0; i < 20; i++) {
            const t = i / 19;
            this.shapes.security.push({
                x: centerX - shieldWidth/4 + t * shieldWidth/2,
                y: shieldBottom - (1 - Math.sin(t * Math.PI)) * shieldHeight * 0.1
            });
        }
        
        // Candado centrado en el escudo
        const lockWidth = shieldWidth * 0.5;
        const lockHeight = shieldHeight * 0.4;
        const lockY = centerY + shieldHeight * 0.05;
        
        // Cuerpo del candado
        this.addRoundedRect(
            this.shapes.security,
            centerX - lockWidth/2,
            lockY - lockHeight/4,
            lockWidth,
            lockHeight/2,
            lockHeight/10
        );
        
        // Arco del candado
        this.addArc(
            this.shapes.security,
            centerX,
            lockY - lockHeight/4,
            lockWidth/2,
            Math.PI,
            Math.PI * 2,
            30
        );
        
        // Ojo de la cerradura
        this.addArc(
            this.shapes.security,
            centerX,
            lockY,
            lockWidth * 0.1,
            0,
            Math.PI * 2,
            15
        );
    }
    
    createMessagingShape(centerX, centerY, radius) {
        // Sistema de mensajes (burbujas de chat con mensajes)
        
        // Burbuja principal (izquierda)
        const mainBubbleSize = radius * 1.2;
        const bubbleCenterX = centerX - radius * 0.3;
        const bubbleCenterY = centerY;
        
        // Contorno de burbuja principal
        this.addRoundedRect(
            this.shapes.messaging,
            bubbleCenterX - mainBubbleSize/2,
            bubbleCenterY - mainBubbleSize/2,
            mainBubbleSize,
            mainBubbleSize,
            mainBubbleSize/5
        );
        
        // Cola de la burbuja principal
        const tailPoints = [
            {x: bubbleCenterX - mainBubbleSize/2 + mainBubbleSize/10, y: bubbleCenterY + mainBubbleSize/2},
            {x: bubbleCenterX - mainBubbleSize/2 - mainBubbleSize/5, y: bubbleCenterY + mainBubbleSize/2 + mainBubbleSize/4},
            {x: bubbleCenterX - mainBubbleSize/2 + mainBubbleSize/3, y: bubbleCenterY + mainBubbleSize/2}
        ];
        
        for (let i = 0; i < tailPoints.length - 1; i++) {
            const start = tailPoints[i];
            const end = tailPoints[i+1];
            for (let j = 0; j < 10; j++) {
                const t = j / 9;
                this.shapes.messaging.push({
                    x: start.x + t * (end.x - start.x),
                    y: start.y + t * (end.y - start.y)
                });
            }
        }
        
        // Líneas de texto (mensajes)
        for (let i = 0; i < 3; i++) {
            const lineY = bubbleCenterY - mainBubbleSize/4 + i * mainBubbleSize/4;
            const lineLength = mainBubbleSize * 0.7;
            
            for (let j = 0; j < 15; j++) {
                const t = j / 14;
                this.shapes.messaging.push({
                    x: bubbleCenterX - lineLength/2 + t * lineLength,
                    y: lineY
                });
            }
        }
        
        // Burbuja secundaria (derecha, más pequeña)
        const secondBubbleSize = mainBubbleSize * 0.7;
        const secondBubbleCenterX = centerX + radius * 0.6;
        const secondBubbleCenterY = centerY - radius * 0.2;
        
        // Contorno de burbuja secundaria
        this.addRoundedRect(
            this.shapes.messaging,
            secondBubbleCenterX - secondBubbleSize/2,
            secondBubbleCenterY - secondBubbleSize/2,
            secondBubbleSize,
            secondBubbleSize,
            secondBubbleSize/5
        );
        
        // Cola de la burbuja secundaria
        const secondTailPoints = [
            {x: secondBubbleCenterX + secondBubbleSize/2 - secondBubbleSize/10, y: secondBubbleCenterY + secondBubbleSize/2},
            {x: secondBubbleCenterX + secondBubbleSize/2 + secondBubbleSize/5, y: secondBubbleCenterY + secondBubbleSize/2 + secondBubbleSize/4},
            {x: secondBubbleCenterX + secondBubbleSize/2 - secondBubbleSize/3, y: secondBubbleCenterY + secondBubbleSize/2}
        ];
        
        for (let i = 0; i < secondTailPoints.length - 1; i++) {
            const start = secondTailPoints[i];
            const end = secondTailPoints[i+1];
            for (let j = 0; j < 10; j++) {
                const t = j / 9;
                this.shapes.messaging.push({
                    x: start.x + t * (end.x - start.x),
                    y: start.y + t * (end.y - start.y)
                });
            }
        }
        
        // Líneas cortas (mensajes en la burbuja secundaria)
        for (let i = 0; i < 2; i++) {
            const lineY = secondBubbleCenterY - secondBubbleSize/6 + i * secondBubbleSize/3;
            const lineLength = secondBubbleSize * 0.6;
            
            for (let j = 0; j < 15; j++) {
                const t = j / 14;
                this.shapes.messaging.push({
                    x: secondBubbleCenterX - lineLength/2 + t * lineLength,
                    y: lineY
                });
            }
        }
        
        // Puntos de notificación (3 puntos suspensivos)
        const dotsY = centerY + radius * 0.6;
        const dotsSpacing = radius * 0.15;
        
        for (let i = -1; i <= 1; i++) {
            const dotX = centerX + i * dotsSpacing;
            this.addArc(
                this.shapes.messaging,
                dotX,
                dotsY,
                radius * 0.05,
                0,
                Math.PI * 2,
                8
            );
        }
    }
    
    createERPShape(centerX, centerY, radius) {
        // Engranaje exterior (símbolo de sistema)
        const gearTeeth = 16;
        const outerRadius = radius * 0.95;
        const innerRadius = radius * 0.75;
        
        for (let i = 0; i < gearTeeth * 2; i++) {
            const angle = (i / (gearTeeth * 2)) * Math.PI * 2;
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            this.shapes.erp.push({
                x: centerX + Math.cos(angle) * r,
                y: centerY + Math.sin(angle) * r
            });
        }
        
        // Círculo interior
        const centerRadius = radius * 0.5;
        this.addArc(
            this.shapes.erp,
            centerX,
            centerY,
            centerRadius,
            0,
            Math.PI * 2,
            40
        );
        
        // Gráfico de barras (símbolo de datos/ERP)
        const barWidth = radius * 0.15;
        const barSpacing = radius * 0.07;
        const barMaxHeight = radius * 0.4;
        const barY = centerY + radius * 0.1;
        const barHeights = [0.7, 0.4, 0.95, 0.6];
        
        // Línea base del gráfico
        for (let i = 0; i < 15; i++) {
            const t = i / 14;
            const lineLength = (barWidth * barHeights.length) + (barSpacing * (barHeights.length - 1));
            this.shapes.erp.push({
                x: centerX - lineLength/2 + t * lineLength,
                y: barY
            });
        }
        
        // Barras del gráfico
        let currentX = centerX - ((barWidth * barHeights.length) + (barSpacing * (barHeights.length - 1))) / 2;
        
        barHeights.forEach(heightFactor => {
            const height = barMaxHeight * heightFactor;
            
            // Rectángulo de la barra
            for (let i = 0; i < 10; i++) {
                const t = i / 9;
                
                // Lados verticales
                this.shapes.erp.push({
                    x: currentX,
                    y: barY - t * height
                });
                
                this.shapes.erp.push({
                    x: currentX + barWidth,
                    y: barY - t * height
                });
            }
            
            // Tope de la barra
            for (let i = 0; i < 10; i++) {
                const t = i / 9;
                this.shapes.erp.push({
                    x: currentX + t * barWidth,
                    y: barY - height
                });
            }
            
            currentX += barWidth + barSpacing;
        });
        
        // Líneas de datos en la parte superior (símil pantalla)
        for (let i = 0; i < 3; i++) {
            const lineY = centerY - radius * 0.3 + i * radius * 0.15;
            const lineLength = radius * 0.7;
            
            for (let j = 0; j < 15; j++) {
                const t = j / 14;
                this.shapes.erp.push({
                    x: centerX - lineLength/2 + t * lineLength,
                    y: lineY
                });
            }
        }
    }
    
    // Método auxiliar para crear curvas de Bezier
    addCurve(shapeArray, x1, y1, x2, y2, x3, y3, x4, y4, steps) {
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            
            // Fórmula de curva de Bezier cúbica
            const cx = 3 * (x2 - x1);
            const bx = 3 * (x3 - x2) - cx;
            const ax = x4 - x1 - cx - bx;
            
            const cy = 3 * (y2 - y1);
            const by = 3 * (y3 - y2) - cy;
            const ay = y4 - y1 - cy - by;
            
            const xt = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + x1;
            const yt = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + y1;
            
            shapeArray.push({ x: xt, y: yt });
        }
    }
    
    // Método auxiliar para crear arcos
    addArc(shapeArray, centerX, centerY, radius, startAngle, endAngle, steps) {
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const angle = startAngle + t * (endAngle - startAngle);
            shapeArray.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            });
        }
    }
    
    // Método auxiliar para crear rectángulos con esquinas redondeadas
    addRoundedRect(shapeArray, x, y, width, height, radius) {
        // Asegurarse de que el radio no sea mayor que la mitad de la anchura o altura
        radius = Math.min(radius, Math.min(width/2, height/2));
        
        // Esquina superior izquierda
        this.addArc(
            shapeArray,
            x + radius,
            y + radius,
            radius,
            Math.PI,
            Math.PI * 1.5,
            10
        );
        
        // Lado superior
        for (let i = 0; i < 15; i++) {
            const t = i / 14;
            shapeArray.push({
                x: x + radius + t * (width - 2 * radius),
                y: y
            });
        }
        
        // Esquina superior derecha
        this.addArc(
            shapeArray,
            x + width - radius,
            y + radius,
            radius,
            Math.PI * 1.5,
            Math.PI * 2,
            10
        );
        
        // Lado derecho
        for (let i = 0; i < 15; i++) {
            const t = i / 14;
            shapeArray.push({
                x: x + width,
                y: y + radius + t * (height - 2 * radius)
            });
        }
        
        // Esquina inferior derecha
        this.addArc(
            shapeArray,
            x + width - radius,
            y + height - radius,
            radius,
            0,
            Math.PI * 0.5,
            10
        );
        
        // Lado inferior
        for (let i = 0; i < 15; i++) {
            const t = i / 14;
            shapeArray.push({
                x: x + width - radius - t * (width - 2 * radius),
                y: y + height
            });
        }
        
        // Esquina inferior izquierda
        this.addArc(
            shapeArray,
            x + radius,
            y + height - radius,
            radius,
            Math.PI * 0.5,
            Math.PI,
            10
        );
        
        // Lado izquierdo
        for (let i = 0; i < 15; i++) {
            const t = i / 14;
            shapeArray.push({
                x: x,
                y: y + height - radius - t * (height - 2 * radius)
            });
        }
    }
    
    initializeNodes() {
        // Crear nodos aleatorios con diferentes tamaños
        for (let i = 0; i < this.nodeCount; i++) {
            // Los primeros nodos son más grandes para definir mejor la forma
            const isFormNode = i < this.nodeCount * 0.6;
            const radius = isFormNode ? Math.random() * 3 + 3 : Math.random() * 2 + 1.5;
            
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: radius,
                targetX: Math.random() * this.width,
                targetY: Math.random() * this.height,
                originalColor: `rgba(30, 144, 255, ${Math.random() * 0.5 + 0.5})`,
                color: `rgba(30, 144, 255, ${Math.random() * 0.5 + 0.5})`,
                transitionSpeed: Math.random() * 0.04 + 0.02, // Más rápido
                isFormNode: isFormNode
            });
        }
    }
    
    initializeConnections() {
        // Crear conexiones entre nodos cercanos
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Solo conectar nodos cercanos
                if (distance < 70) {
                    this.connections.push({
                        from: i,
                        to: j,
                        opacity: Math.random() * 0.5 + 0.2 // Más visible
                    });
                }
            }
        }
    }
    
    updateNodeColors(theme) {
        const colors = this.themeColors[theme];
        
        // Actualizar colores de los nodos
        this.nodes.forEach((node, index) => {
            // Nodos que forman parte de la forma tienen colores primarios más vivos
            const isShapeNode = index < this.currentShape.length;
            const color = isShapeNode ? colors.primary : colors.secondary;
            const alpha = isShapeNode ? 0.9 : (Math.random() * 0.3 + 0.3); // Más opacidad para nodos de la forma
            node.color = this.hexToRgba(color, alpha);
        });
    }
    
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    updateNodes(deltaTime) {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            
            if (this.currentShape && i < this.currentShape.length) {
                const targetX = this.currentShape[i].x;
                const targetY = this.currentShape[i].y;
                
                // Transición más rápida hacia la nueva posición
                const dx = targetX - node.x;
                const dy = targetY - node.y;
                
                // Velocidad adaptativa - más rápida cuando está lejos
                const distance = Math.sqrt(dx*dx + dy*dy);
                const speedFactor = Math.min(1, distance / 30) * 3;
                
                node.x += dx * node.transitionSpeed * deltaTime * 0.1 * speedFactor;
                node.y += dy * node.transitionSpeed * deltaTime * 0.1 * speedFactor;
            } else {
                // Movimiento normal para nodos que no forman parte de la figura
                node.x += node.vx;
                node.y += node.vy;
                
                // Mantener dentro del canvas
                if (node.x < 0) { node.x = 0; node.vx *= -1; }
                if (node.x > this.width) { node.x = this.width; node.vx *= -1; }
                if (node.y < 0) { node.y = 0; node.vy *= -1; }
                if (node.y > this.height) { node.y = this.height; node.vy *= -1; }
                
                // Agregar un poco de aleatoriedad al movimiento
                if (Math.random() < 0.02) {
                    node.vx = (Math.random() - 0.5) * 0.5;
                    node.vy = (Math.random() - 0.5) * 0.5;
                }
            }
        }
    }
    
    drawNodes() {
        // Limpiar canvas con fondo transparente
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Dibujar conexiones
        for (const connection of this.connections) {
            const from = this.nodes[connection.from];
            const to = this.nodes[connection.to];
            
            const dx = from.x - to.x;
            const dy = from.y - to.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const opacity = Math.max(0, 1 - distance / 100) * connection.opacity;
                
                // Usar color mezclado de los nodos para la conexión
                const fromColor = from.color.replace(/[^\d,]/g, '').split(',');
                const toColor = to.color.replace(/[^\d,]/g, '').split(',');
                
                const r = Math.floor((parseInt(fromColor[0]) + parseInt(toColor[0])) / 2);
                const g = Math.floor((parseInt(fromColor[1]) + parseInt(toColor[1])) / 2);
                const b = Math.floor((parseInt(fromColor[2]) + parseInt(toColor[2])) / 2);
                
                this.ctx.beginPath();
                this.ctx.moveTo(from.x, from.y);
                this.ctx.lineTo(to.x, to.y);
                this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                this.ctx.lineWidth = Math.min(from.radius, to.radius) / 3; // Conexiones más visibles
                this.ctx.stroke();
            }
        }
        
        // Dibujar nodos
        for (const node of this.nodes) {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();
        }
        
        // Mostrar etiqueta de la forma actual
        if (this.shapeLabel) {
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = this.currentTheme ? this.themeColors[this.currentTheme].primary : '#333';
            this.ctx.fillText(this.shapeLabel, this.width/2, this.height - 20);
        }
    }
    
    changeShape() {
        const shapes = Object.keys(this.shapes);
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        this.currentShape = this.shapes[randomShape];
        this.currentTheme = randomShape;
        this.lastShapeChange = performance.now();
        
        // Establecer etiqueta según la forma
        switch(randomShape) {
            case 'btc': this.shapeLabel = "Bitcoin"; break;
            case 'eth': this.shapeLabel = "Ethereum"; break;
            case 'gold': this.shapeLabel = "PAX Gold"; break;
            case 'security': this.shapeLabel = "Ciberseguridad"; break;
            case 'messaging': this.shapeLabel = "Mensajería"; break;
            case 'erp': this.shapeLabel = "ERP"; break;
            default: this.shapeLabel = "";
        }
        
        // Actualizar colores según la forma
        this.updateNodeColors(randomShape);
        
        // Usar suficientes nodos para definir claramente la forma
        const shapeNodeCount = Math.min(this.currentShape.length, Math.floor(this.nodes.length * 0.6));
        
        // Asignar nodos a la nueva forma
        // Primero ordenamos para que los nodos más grandes formen la forma
        const sortedNodeIndices = Array.from({ length: this.nodes.length }, (_, i) => i)
            .sort((a, b) => this.nodes[b].radius - this.nodes[a].radius);
        
        for (let i = 0; i < shapeNodeCount; i++) {
            const nodeIndex = sortedNodeIndices[i];
            const shapePoint = this.currentShape[i % this.currentShape.length];
            
            this.nodes[nodeIndex].targetX = shapePoint.x;
            this.nodes[nodeIndex].targetY = shapePoint.y;
            this.nodes[nodeIndex].isFormNode = true;
        }
        
        // El resto de los nodos se mueven libremente
        for (let i = shapeNodeCount; i < this.nodes.length; i++) {
            const nodeIndex = sortedNodeIndices[i];
            this.nodes[nodeIndex].vx = (Math.random() - 0.5) * 0.5;
            this.nodes[nodeIndex].vy = (Math.random() - 0.5) * 0.5;
            this.nodes[nodeIndex].isFormNode = false;
        }
    }
    
    animate(time) {
        const deltaTime = time - (this.lastTime || time);
        this.lastTime = time;
        
        // Cambiar de forma cada cierto tiempo
        if (time - this.lastShapeChange > this.shapeCycleTime || !this.currentShape) {
            this.changeShape();
        }
        
        this.updateNodes(deltaTime);
        this.drawNodes();
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Iniciar la animación cuando se cargue la ventana
window.addEventListener('load', () => {
    if (document.getElementById('neural-network')) {
        new NeuralAnimation();
    }
});