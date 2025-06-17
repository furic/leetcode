SELECT book_id, title, author, genre, publication_year, current_borrowers FROM library_books
LEFT JOIN (SELECT book_id, COUNT(*) as current_borrowers from borrowing_records WHERE return_date IS NULL GROUP BY book_id) t USING(book_id)
WHERE total_copies = current_borrowers
ORDER BY current_borrowers DESC, title