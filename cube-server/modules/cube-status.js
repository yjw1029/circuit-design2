class Cube {
    constructor(){
        this.front = [];
        this.back = [];
        this.top = [];
        this.bottom = [];
        this.left = [];
        this.right = [];
    }

    init() {
        this.front = [];
        this.back = [];
        this.top = [];
        this.bottom = [];
        this.left = [];
        this.right = [];
        let face_color = {
            front: 'G',
            back: 'B',
            left: 'O',
            right: 'R',
            top: 'W',
            bottom: 'Y'
        }
        let face = ['front', 'back', 'left', 'right', 'top', 'bottom'];
        face.map((face) => {
            const color = face_color[face]; 
            for(let i = 0; i < 3; i++) {
                const row = []
                for (let j=0; j < 3; j++) {
                    row.push(color);
                }
                this[face].push(row);
            }
            return face;
        })
    }

    rotateFront(face, dir) {
        let matrix = this[face];
        let new_matrix_index_0 = [[[2,0], [1,0], [0,0]], [[2,1], [1,1], [0,1]], [[2,2], [1,2], [0,2]]];
        let new_matrix_index_1 = [[[0,2],[1,2],[2,2]], [[0,1],[1,1], [2,1]],[[0,0], [1,0], [2,0]]]; 
        let new_matrix_index
        if(!dir) {
            new_matrix_index = new_matrix_index_0;
        } else {
            new_matrix_index = new_matrix_index_1;
        }
        let new_matrix = [];
        for (let i = 0; i<3 ; i++){
            let new_row = [];
            for (let j = 0; j<3; j++) {
                let new_row_index = new_matrix_index[i][j];
                new_row.push(matrix[new_row_index[0]][new_row_index[1]]);
            }
            new_matrix.push(new_row);
        }
        this[face] = new_matrix;
    }


    getBeside(locinfo) {
        let row = [];
        let count = locinfo.count;
        if(locinfo.ifrow) {
            for(let i=0; i<3; i++) {
                row.push(this[locinfo.face][count][i]);
            }
        } else {
            for(let i=0; i<3; i++) {
                row.push(this[locinfo.face][i][count]);
            }
        }
        if(locinfo.reverse) {
            row = row.map( (value, index) => {
                return(row[2-index])
            }) 
        }
        return row;
    }

    setBeside(locinfo, new_value) {
        let count = locinfo.count;
        if(locinfo.reverse) {
            new_value = new_value.map( (value, index) => {
                return(new_value[2-index])
            }) 
        }
        if(locinfo.ifrow) {
            for(let i=0; i<3; i++) {
                this[locinfo.face][count][i] = new_value[i];
            }
        } else {
            for(let i=0; i<3; i++) {
                this[locinfo.face][i][count] = new_value[i];
            }
        }
    }

     /**
        * @rotate_besides: 转的面会影响到哪四个面
        *      @face: 标记是哪个面 
        *      @ifrow: 标记被影响的是列或者是行
        *      @count: 标记是哪个面（行）
        *      @reverse: 顺时针转是是否需要逆序
        *  */
    rotateBeside(face, dir) {
    

       const rotate_besides = {
        front: [
            {face: 'left', ifrow: false, count: 2, reverse: true},
            {face: 'top', ifrow: true, count: 2, reverse: false},
            {face: 'right', ifrow: false, count: 0, reverse: false},
            {face: 'bottom', ifrow: true, count: 0, reverse: true},
        ],
        back: [
            { face: 'right', ifrow: false, count: 2, reverse: false},
            { face: 'top', ifrow: true, count: 0, reverse: false},
            { face: 'left', ifrow: false, count: 0, reverse: true},
            { face: 'bottom', ifrow: true, count: 2, reverse: true}
        ],
        right: [
            { face: 'front', ifrow: false, count: 2, reverse: false},
            { face: 'top', ifrow: false, count: 2, reverse: false},
            { face: 'back', ifrow: false, count: 0, reverse: true},
            { face: 'bottom', ifrow: false, count: 2, reverse: false}
        ],
        left: [
            { face: 'front', ifrow: false, count: 0, reverse: false},
            { face: 'bottom', ifrow: false, count: 0, reverse: false},
            { face: 'back', ifrow: false, count: 2, reverse: true},
            { face: 'top', ifrow: false, count: 0, reverse: false},
        ],
        top: [
            { face: 'front', ifrow: true, count: 0, reverse: false},
            { face: 'left', ifrow: true, count: 0, reverse: false},
            { face: 'back', ifrow: true, count: 0, reverse: false},
            { face: 'right', ifrow: true, count: 0, reverse: false},
        ],
        bottom: [
            { face: 'front', ifrow: true, count: 2, reverse: false},
            { face: 'right', ifrow: true, count: 2, reverse: false},
            { face: 'back', ifrow: true, count: 2, reverse: false},
            { face: 'left', ifrow: true, count: 2, reverse: false},
        ]  
        }  
    
        let rotate_beside = rotate_besides[face];
        let temp_beside;
    
        if (!dir){
            // 顺时针
            // set temp beside
            temp_beside = this.getBeside(rotate_beside[3]);
            for(let i=3 ;i>0; i--){
                let get_old_beside = rotate_beside[i];
                let get_new_beside = rotate_beside[(i+3)%4];
                const new_beside = this.getBeside(get_new_beside);
                this.setBeside(get_old_beside, new_beside);
            }
            this.setBeside(rotate_beside[0] ,temp_beside);
        } else {
            // 逆时针
            // set temp beside
            temp_beside = this.getBeside(rotate_beside[0]);
            for(let i=0 ;i<3; i++){
                let get_old_beside = rotate_beside[i];
                let get_new_beside = rotate_beside[(i+1)%4];
                const new_beside = this.getBeside(get_new_beside);
                this.setBeside(get_old_beside, new_beside);
            }
            this.setBeside(rotate_beside[3] ,temp_beside);
        }   
    }
    


    rotate(face, dir) {
        this.rotateFront(face, dir);
        this.rotateBeside(face, dir);
    }

    print_matrix(matrix) {
        let matrix_str = '';
        for(let i = 0; i<3; i++) {
            for(let j=0; j<3; j++) {
                matrix_str += matrix[i][j];
            }
            matrix_str += '\n';
        }
        matrix_str += '\n';
        return matrix_str;
    }

    print_cube() {
        let cube_str = '';
        let faces = ['front', 'right','back', 'left', 'top', 'bottom'];
        faces.map((face) => {
            cube_str += this.print_matrix(this[face]);
            return face;
        })
        console.log(cube_str);
        return cube_str;
    }

}

module.exports = Cube;


// let cube = new Cube();
// cube.init();
// cube.rotate('right', 1);
// cube.rotate('bottom', 1);
// cube.print_cube();

