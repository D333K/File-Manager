const container = document.querySelector(".container");
const container_title = document.querySelector("h1");

// Control Variable.
const control_btns = {

    create_folder_btn: document.querySelector(".new-folder-btn"),
    create_file_btn: document.querySelector(".new-file-btn"),
    rename_btn: document.querySelector(".rename-btn"),
    delete_btn: document.querySelector(".delete-btn"),
    back_btn: document.querySelector(".back-btn"),

}

let path = {

    full_path: document.querySelector("#path"),
    pre_folders: [],
    pre_path: [],

};

const file_list = document.querySelector("#file-list");
const home_btn = document.querySelector("#home-btn");

// Create Container And Content.
const create_f = {

    title_create: document.querySelector("#create-title"),

    create_container: document.querySelector(".create-container"),
    input_name: document.querySelector("#input-name"),

    create_btn: document.querySelector("#create-btn"),
    cancel_btn: document.querySelector("#cancel-create-btn"),
    
};

// Rename Container And Content.
const rename_f = {

    rename_container: document.querySelector(".rename-container"),
    
    rename_title: document.querySelector("#rename-title"),
    input_new_name: document.querySelector("#input-name-f"),

    select_f: document.querySelector("#select-f-rename"),

    rename_f_btn: document.querySelector("#rename-btn"),
    cancel_btn: document.querySelector("#cancel-rename-btn"),

};

// Delete Container And Content.
const delete_f = {

    delete_container: document.querySelector(".delete-container"),
    
    delete_title: document.querySelector("#delete-title"),
    select_f: document.querySelector("#select-f-delete"),

    delete_f_btn: document.querySelector("#delete-btn"),
    cancel_btn: document.querySelector("#cancel-delete-btn"),

};

const time_date = new Date();

let home_folder = { // The root of tree.

    name: home_btn.outerText,
    type: "folder",
    date: time_date,
    children: [],

};

let current_folder = {...home_folder};
let folders_btn = file_list.querySelectorAll("button");

let type_of_create = '';
let check = false; // This variable to check if user clicked the home_btn or still in root.

const folder_svg = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-icon lucide-folder">
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
    </svg>
`;

const file_svg = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide 
        lucide-file-icon lucide-file"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/>
        <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
    </svg>
`;

function data_structure(name_f, type_f){
    
    data = {

        name: name_f,
        type: type_f,
        date: time_date,
        
    };

    return data;

};

// This function check to disabled the buttons or not by some conditions
// and update the folder list and current path.
function disabled_btn_update(){

    folders_btn = file_list.querySelectorAll("button");

    if(create_f.input_name.value == ''){

        create_f.create_btn.disabled = true;
        
    }else if(create_f.input_name.value != ''){

        create_f.create_btn.disabled = false;
    
    }
    if(path.full_path.outerText == ''){
        
        control_btns.create_folder_btn.disabled = true;
        control_btns.create_file_btn.disabled = true;

        control_btns.rename_btn.disabled = true;
        control_btns.delete_btn.disabled = true;
        
        control_btns.back_btn.disabled = true;


    }else if(path.full_path.outerText != ''){

        control_btns.create_folder_btn.disabled = false;
        control_btns.create_file_btn.disabled = false;

        control_btns.rename_btn.disabled = false;
        control_btns.delete_btn.disabled = false;
        
        control_btns.back_btn.disabled = false;

    }

};

function option_list(value, text){
    
    const option_f = document.createElement("option");
    
    option_f.value = `f_num ${value}`;
    option_f.text = text;

    return option_f;

}

function update_list(child, index){

    // const date_create = document.createElement("span");

    // date_create.innerHTML = time_date.toLocaleDateString("en-US");

    if(child.type == "folder"){

        const folder_btn = document.createElement("button");

        folder_btn.innerHTML = `${folder_svg} ${child.name}`;

        const li = document.createElement('li');
        
        // folder_btn.innerText = child.name;
        li.appendChild(folder_btn)
        file_list.appendChild(li);
        
    }
    else if(child.type == "file"){

        const file_para = document.createElement('p');
        const li = document.createElement('li');

        file_para.innerHTML = `${file_svg} ${child.name}`;
        
        // file_para.innerText = child.name;
        li.appendChild(file_para);
        file_list.appendChild(li);

    }

    delete_f.select_f.appendChild(option_list(index + 1, child.name));
    rename_f.select_f.appendChild(option_list(index + 1, child.name));

}

function create_folder(){

    // Make a small window to get the name of folder from user.
    create_f.create_container.style.display = "block";
    let folder_name = create_f.input_name.value;

    let data_folder = {

        ...data_structure(folder_name, "folder"),
        children: [],

    };

    return data_folder;
    
}

function create_file(){

    // Make a small window to get the name of folder from user.
    create_f.create_container.style.display = "block";
    let file_name = create_f.input_name.value;
    return data_structure(file_name, "file");
    
};

control_btns.create_folder_btn.addEventListener("click", () => {
    
    type_of_create = "folder";
    create_f.create_container.style.display = "block";
    
    create_f.title_create.innerText = "new folder";

    create_f.input_name.focus();
    create_f.input_name.placeholder = "Folder Name. . .";

    container_title.style.filter = "blur(3px)";
    container.style.filter = "blur(3px)";
    
});

control_btns.create_file_btn.addEventListener("click", () => {

    type_of_create = "file";
    create_f.create_container.style.display = "block";
    
    create_f.title_create.innerText = "new file"
    
    create_f.input_name.focus();
    create_f.input_name.placeholder = "File Name. . .";

    container_title.style.filter = "blur(3px)";
    container.style.filter = "blur(3px)";

});

control_btns.rename_btn.addEventListener("click", () => {

    rename_f.rename_container.style.display = "block";

    rename_f.rename_title.innerText = "rename";

    rename_f.input_new_name.style.display = "";

    rename_f.input_new_name.focus();
    rename_f.input_new_name.placeholder = "New Name. . .";

    container_title.style.filter = "blur(3px)";
    container.style.filter = "blur(3px)";

});

control_btns.delete_btn.addEventListener("click", () => {

    delete_f.delete_container.style.display = "block";

    delete_f.delete_title.innerText = "delete";

    container_title.style.filter = "blur(3px)";
    container.style.filter = "blur(3px)";

});

create_f.create_btn.addEventListener("click", () => {
    
    container_title.style.filter = "blur(0)";
    container.style.filter = "blur(0)";

    // Here still a prolem (not error:|), try fix it after make "change direction feature".
    if(type_of_create == "folder"){

        current_folder.children.push(create_folder());
        
    }else if(type_of_create == "file"){
        
        current_folder.children.push(create_file());
        
    }
    
    file_list.innerHTML = '';
    rename_f.select_f.innerHTML = '';
    delete_f.select_f.innerHTML = '';

    current_folder.children.forEach(update_list);
    
    create_f.input_name.value = '';
    create_f.create_container.style.display = "none";
    
});

create_f.cancel_btn.addEventListener("click", () => {
    
    create_f.input_name.value = '';
    create_f.create_container.style.display = "none";

    container_title.style.filter = "blur(0)";
    container.style.filter = "blur(0)";
    
});

// After finishing this function, it's will be the last thing of the challenge🌑.
rename_f.rename_f_btn.addEventListener("click", () => {

    container_title.style.filter = "blur(0)";
    container.style.filter = "blur(0)";
    
    const user_option = rename_f.select_f;
    const option_index = user_option.selectedIndex;
    const user_selected = user_option.options[option_index].text;
    
    file_list.innerHTML = '';
    rename_f.select_f.innerHTML = '';
    delete_f.select_f.innerHTML = '';

    current_folder.children.forEach((child, index) => {
        
        if(user_selected == child.name){

            child.name = rename_f.input_new_name.value;

        }

    });

    if(current_folder.children.length == 0){

        file_list.innerHTML = `
            <p style='text-align: left; font-size: 20px; color: #333; font-weight: 600;'>
            No files or folders found.
            </p>
        `;

    }else{

        current_folder.children.forEach(update_list);

    }

    rename_f.input_new_name.value = '';
    rename_f.rename_container.style.display = "none";
    
});

rename_f.cancel_btn.addEventListener("click", () => {

    rename_f.input_new_name.value = '';
    rename_f.rename_container.style.display = "none";

    container_title.style.filter = "blur(0)";
    container.style.filter = "blur(0)";

});

delete_f.delete_f_btn.addEventListener("click", () => {

    container_title.style.filter = "blur(0)";
    container.style.filter = "blur(0)";

    const user_option = delete_f.select_f;
    const option_index = user_option.selectedIndex;
    const user_selected = user_option.options[option_index].text;

    file_list.innerHTML = '';
    delete_f.select_f.innerHTML = '';
    rename_f.select_f.innerHTML = '';

    current_folder.children.forEach((child, index) => {

        if(user_selected == child.name){

            current_folder.children.splice(index, 1);

        }

    });

    if(current_folder.children.length == 0){

        file_list.innerHTML = `
            <p style='text-align: left; font-size: 20px; color: #333; font-weight: 600;'>
            No files or folders found.
            </p>
        `;

    }else{
        
        current_folder.children.forEach(update_list);

    }

    delete_f.delete_container.style.display = "none";

});

delete_f.cancel_btn.addEventListener("click", () => {

    delete_f.delete_container.style.display = "none";

    container_title.style.filter = "blur(0)";
    container.style.filter = "blur(0)";

});

home_btn.addEventListener("click", () => {
    
    path.full_path.innerText += `/${home_folder.name}`;
    
    file_list.innerHTML = '';
    rename_f.select_f.innerHTML = '';
    delete_f.select_f.innerHTML = '';

    if(home_folder.children.length === 0){

        file_list.innerHTML = `
            <p style='text-align: left; font-size: 20px; color: #333; font-weight: 600;'>
            No files or folders found.
            </p>
        `;
        
    }else if(home_folder.children.length != 0){

        home_folder.children.forEach(update_list);

    }
    
    check = true;
    
});

function cd(){ //cd => Change Direction.

    // This condtition to check if the user clicked the home_btn or still in root
    // to not executing this code every one second(look at line 340).
    if(check){ 

        folders_btn.forEach((btn, index) => {

            btn.addEventListener("click", () => {
                console.log(btn.outerText);
                
                current_folder.children.forEach((child, index) => {

                    if(child.name == btn.outerText){
                        
                        path.pre_folders.push({...current_folder});
                        
                        current_folder = current_folder.children[index];
                        
                        path.full_path.innerText += `/${current_folder.name}`;

                        file_list.innerHTML = '';
                        rename_f.select_f.innerHTML = '';
                        delete_f.select_f.innerHTML = '';

                        if(current_folder.children.length == 0){

                            file_list.innerHTML = `
                                <p style='text-align: left; font-size: 20px; color: #333; font-weight: 600;'>
                                No files or folders found.
                                </p>
                            `;
                            
                        }else if(current_folder.children.length != 0){

                            current_folder.children.forEach(update_list);

                        }
                        
                    }

                });
                
            });
            
        });
        
    }
    
}

// This code display the previous folder and change the path value.
control_btns.back_btn.addEventListener("click", () => {

    path.pre_path = path.full_path.outerText.split("/");

    let path_len = Math.max(0, (path.pre_path?.length ?? 0) - 1);
    let folder_len = Math.max(0, (path.pre_folders?.length ?? 0) - 1);

    file_list.innerHTML = '';
    
    path.full_path.innerText = '';

    rename_f.select_f.innerHTML = '';
    delete_f.select_f.innerHTML = '';
    
    if(path.pre_path[path_len] == "home"){ // If the user previous to root display this.
        
        file_list.appendChild(home_btn);
        
    }else{
        
        path.pre_path.pop();
        path.full_path.innerText = path.pre_path.join('/');
        
        path.pre_folders[folder_len].children.forEach(update_list);
        
        current_folder = path.pre_folders[folder_len];
                
        path.pre_folders.pop();
        
    }

});

setInterval(disabled_btn_update, 500);
setInterval(cd, 1000);

// console.log(time_date.toLocaleDateString("en-US"));
// console.log(time_date.toLocaleDateString("ar-EG"));

// Note:-
// The Problem: if i click back button so many times and click to change direction button nothing will change!.
// I rly hope u understand this note abt the problem🤲.
// Alhamdullah this problem has been resolved🙂.
