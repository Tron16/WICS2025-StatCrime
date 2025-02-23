import pandas as pd
def filterData(path, start, end, output): #Only get a certain number of rows from a CSV
    data = pd.read_excel(path)
    updated_data = data.drop(data.index[start:end]).reset_index(drop=True)
    updated_data.to_csv(output, index=False)
    print(f"Deleted rows from {start} to {end} and saved the updated file as '{output}'.")

filterData("data/NIBRSPublicView2024.xlsx", 6001, 250169, "data/Houston.csv")