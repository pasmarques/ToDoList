import { Alert, StyleSheet, Text, View } from 'react-native';
import { StartButton } from '../../Components/StartButton';
import { CardCreateTask } from '../../Components/CardCreateTask';
import CreateTaskButton from '../../Components/CreateTaskButton';
import { useState } from 'react';
import { TaskProps } from '../../Utils/types';
import { useContext } from 'react';
import { TaskContext } from '../../Context/TaskContext';
import FavoriteTaskButton from '../../Components/FavoriteTaskButton';

export default function CreateTask({ navigation }: { navigation: any }){
    console.log("Tela CreateTask abriu")

    const { createTask,tasks } = useContext(TaskContext);
    const [nameTask, setNameTask] = useState('');
    const [isFavTask, setIsFavTask] = useState(false);
    const [descriptionTask, setDescriptionTask] = useState('');

    const handleCreateTask =  () => {
      const newTask: TaskProps = {
        title: nameTask,
        description: descriptionTask,
        isFinished: false,
        isFav: isFavTask,
      };
      if(tasks.some((task)=>task.title == newTask.title)){
        Alert.alert("Tarefa já existe, tente outro nome")
        return
      }
      else{
        createTask(newTask);
      }
      navigation.navigate("HomeTasks"); // Volta para a tela anterior após criar a tarefa
    };
    
    return (
      <View style={styles.container}>
        <CardCreateTask setTaskName={setNameTask} setTaskDescription={setDescriptionTask} taskName ={nameTask} taskDescription ={descriptionTask}/>
       
        <View style = {styles.favoriteTaskView}>
                <FavoriteTaskButton isFav = {isFavTask} onPress={()=>setIsFavTask(!isFavTask)}></FavoriteTaskButton>
        </View>
        <View style = {styles.optionsToCreate}>
          <CreateTaskButton isGreen={true} onPress={handleCreateTask}/>
          <StartButton onPress={()=>navigation.navigate('HomeTasks')}></StartButton>
        </View>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 64,
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 16,
    },
    optionsToCreate: {
      marginBottom: 16,  
      gap: 16,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    favoriteTaskView: {
      flex: 1,  
      justifyContent: 'flex-end', 
      alignItems: 'center',
      marginBottom: 32,
    },
});
  